
import time,random
from enum import Enum

from xaal.lib import tools

import logging
logger = logging.getLogger(__name__)

# how often we force refresh the devices attributes/description/keyvalues
REFRESH_RATE = 300

def now():
    return int(time.time())

class Device:
    def __init__(self, addr, devtype, version):
        self.address = addr
        self.short_address = tools.reduce_addr(addr)
        self.devtype = devtype
        self.version = version
        # device cache
        self.attributes = {}
        self.description = {}
        self.db = {}
        # Alive management
        self.last_alive = int(time.time())
        self.next_alive = 0
        # Refresh rate 
        self.refresh = 0
        self.refresh_attributes = 0
        self.refresh_description = 0
        self.refresh_db = 0

    def update_attributes(self, data):
        """ rude update attributes. Return true if updated"""
        # really no the best comparaison, but we just need a flag
        if self.attributes == data:
            return False
        self.attributes.update(data)
        self.refresh_attributes = now()
        return True

    def update_description(self, data):
        self.description.update(data)
        self.refresh_description = now()

    def set_db(self,data):
        self.db = data
        self.refresh_db = now()

    def update_db(self,data):
        self.db.update(data)
        self.refresh_db = now()

    def update_cache_db(self,data):
        purge = []
        for k in data:
            if data[k]==None:
                purge.append(k)
        self.db.update(data)
        for k in purge:
            self.db.pop(k)
        self.refresh_db = 0

    def alive(self,value):
        self.last_alive = int(time.time())
        self.next_alive = self.last_alive + value

    def get_kv(self,key):
        try:
            return self.db[key]
        except KeyError:
            return None

    def dump(self):
        print("*** %s %s **" % (self.address,self.devtype))
        print("    Description : %s" % self.description)
        print("    Attributes : %s" % self.attributes)
        print()

    @property
    def display_name(self):
        result = ''
        result = self.db.get('nickname',result)
        result = self.db.get('name',result)
        return result

class Devices:
    """ Device List for monitoring """
    def __init__(self):
        self.__devs = {}
        self.__list_cache = None

    def add(self,addr,devtype,version):
        dev = Device(addr,devtype,version)
        self.__devs.update({addr : dev})
        self.__list_cache = None
        return dev


    def get(self):
        if not self.__list_cache:
            #print("Refresh cache")
            res = list(self.__devs.values())
            res.sort(key = lambda d: d.devtype)
            self.__list_cache = res
        return self.__list_cache

    def get_with_addr(self, addr):
        try:
            return self.__devs[addr]
        except KeyError:
            return None

    def get_with_devtype(self,devtype):
        r = []
        for d in self.get():
            if d.devtype == devtype:
                r.append(d)
        return r

    def get_with_key(self,key):
        r = []
        for d in self.get():
            if key in d.db:
                r.append(d)
        return r

    def get_with_key_value(self,key,value):
        r = []
        for d in self.get():
            if (key in d.db) and (d.db[key]==value):
                r.append(d)
        return r

    def fetch_one_kv(self,key,value):
        r = self.get_with_key_value(key,value)
        try:
            return r[0]
        except IndexError:
            return None
    
    def get_devtypes(self):
        """ return the list of distinct devtypes"""
        l = []
        for dev in self.__devs.values():
            if dev.devtype not in l:
                l.append(dev.devtype)
        l.sort()
        return l

    def __len__(self):
        return len(self.__devs)

    def __getitem__(self,idx):
        if isinstance(idx, str):
            return self.__devs[idx]
        return self.get()[idx]

    def __repr__(self):
        return str(self.get())

    def __contains__(self,key):
        return key in self.__devs

    def auto_wash(self):
        now = int(time.time())
        for dev in self.get():
            if dev.next_alive < now:
                logger.info("Auto Washing %s" % dev.address)
                del self.__devs[dev.address]
                self.__list_cache = None

    def display(self):
        for d in self.get():
            print("%s %s" % (d.address,d.devtype))



class Notification(Enum):
    new_device          = 0
    drop_device         = 1  # sending drop_device notif is not implemented yet,
    attribute_change    = 2

class Monitor:
    """
    class xAAL Monitor:
    use this class to monitor a xAAL network
    """
    def __init__(self,device,filter_func=None,db_server=None):
        self.dev = device
        self.engine = device.engine
        self.db_server = db_server
        
        self.devices = Devices()
        self.filter = filter_func
        self.subscribers = []
        self.engine.add_rx_handler(self.parse_msg)
        self.engine.add_timer(self.auto_wash, 10)
        self.engine.add_timer(self.send_isalive, 240)
        self.engine.add_timer(self.refresh_devices, 5)

    def parse_msg(self, msg):
        # do nothing for some msg
        if (self.filter!=None) and self.filter(msg)==False:
            return

        if msg.source not in self.devices:
            dev = self.add_device(msg)
            self.notify(Notification.new_device,dev)

        dev = self.devices.get_with_addr(msg.source)

        if msg.is_alive():
            dev.alive(msg.body['timeout'])

        elif msg.is_attributes_change() or msg.is_get_attribute_reply():
            r = dev.update_attributes(msg.body)
            if r:
                self.notify(Notification.attribute_change,dev)

        elif msg.is_get_description_reply():
            dev.update_description(msg.body)

        elif self.is_reply_metadb(msg):
            addr = msg.body['device']
            target = self.devices.get_with_addr(addr)
            if target and 'map' in msg.body:
                target.set_db(msg.body['map'])

        elif self.is_update_metadb(msg):
            addr = msg.body['device']
            target = self.devices.get_with_addr(addr)
            if target and 'map' in msg.body:
                target.update_db(msg.body['map'])
        
    def subscribe(self,func):
        self.subscribers.append(func)

    def unsubscribe(self,func):
        self.subscribers.remove(func)
            
    def notify(self,ev_type,device):
        for s in self.subscribers:
            s(ev_type,device)

    def add_device(self,msg):
        return self.devices.add(msg.source,msg.devtype,msg.version)

    def send_isalive(self):
        self.engine.send_isAlive(self.dev, "any.any")

    def auto_wash(self):
        """call the Auto-wash on devices List"""
        self.devices.auto_wash()

    def refresh_devices(self):
        now = int(time.time())
        for dev in self.devices:
            if dev.refresh + REFRESH_RATE < now:
                if dev.refresh_db + REFRESH_RATE < now:
                    self.request_metadb(dev.address)
                if dev.refresh_attributes + REFRESH_RATE < now:
                    self.engine.send_get_attributes(self.dev,[dev.address,])
                if dev.refresh_description + REFRESH_RATE < now:
                    self.engine.send_get_description(self.dev,[dev.address,])
                # to avoid bulk send, we introduce this salt in refresh
                dev.refresh = now - random.randint(0,20)

    def request_metadb(self,addr):
        if self.db_server:
            self.engine.send_request(self.dev,[self.db_server,],'getKeysValues',{'device':addr})
        
    def is_reply_metadb(self,msg):
        if msg.msgtype == 'reply' and msg.action == 'getKeysValues' and msg.source == self.db_server:
            return True
        return False

    def is_update_metadb(self,msg):
        if msg.msgtype == 'notify' and msg.action == 'keysValuesChanged' and msg.source == self.db_server:
            return True
        return False
