from xaal.schemas import devices
from xaal.lib import tools,Device

import ujson
import logging
import socket
import binascii

from Crypto.Cipher import AES

GW_PORT = 9898
AQARA_ENCRYPT_IV = b'\x17\x99\x6d\x09\x3d\x28\xdd\xb3\xba\x69\x5a\x2e\x6f\x58\x56\x2e'

logger = logging.getLogger(__name__)

class AqaraDev(object):
    def __init__(self,sid,model,base_addr):
        self.sid = sid
        self.model = model
        self.base_addr = base_addr
        self.devices = []
        logger.info('New AqaraDevice %s %s' % (model,sid))
        self.setup()
        self.init_properties()

    def setup(self):
        logger.warning('Please overide setup()')

    def init_properties(self):
        for dev in self.devices:
            dev.vendor_id = 'Xiaomi / Aqara'
            dev.product_id = self.model
            dev.hw_id = self.sid
            dev.info = 'Aqara device: %s / %s' % (self.model,self.sid)
            if len(self.devices) > 1:
                dev.group_id = self.base_addr + 'ff'

    def parse(self,pkt):
        cmd = pkt.get('cmd',None)
        if not cmd:
            logger.warning('pkt w/ no command: %s' % pkt)
            return
        if cmd in ['report','heartbeat']:
            pload = pkt.get('data',None)
            if pload:
                data = ujson.decode(pload)
                if cmd == 'report':
                    self.on_report(data)
                if cmd == 'heartbeat':
                    self.on_heartbeat(data)
        else:
            logger.info(pkt)

    def on_report(self,data):
        logger.info('Unhandled report %s' % data)

    def on_heartbeat(self,data):
        print(data)


class Switch(AqaraDev):
    def setup(self):
        dev = Device('button.basic',self.base_addr+'00')
        self.devices.append(dev)

    def on_report(self,data):
        status = data.get('status',None)
        if status:
            self.devices[0].send_notification(status)


class Switch86sw2(AqaraDev):
    def setup(self):
        btn1 = Device('button.basic',self.base_addr+'00')
        btn2 = Device('button.basic',self.base_addr+'01')
        btn3 = Device('button.basic',self.base_addr+'02')
        self.devices = self.devices + [btn1,btn2,btn3]

    def on_report(self,data):
        chans = ['channel_0','channel_1','dual_channel']
        idx = 0 
        for k in chans:
            r = data.get(k,None)
            # in the current firmware this switch alsway return both click and long_click
            if r and (r.startswith('long_')==False):
                if r=='both_click': r='click'
                self.devices[idx].send_notification(r)
            idx = idx + 1

class Weather(AqaraDev):
    def setup(self):
        self.devices.append(devices.thermometer(self.base_addr+'00'))
        self.devices.append(devices.hygrometer(self.base_addr+'01'))
        self.devices.append(devices.barometer(self.base_addr+'02'))

    def on_report(self,data):
        val = data.get('temperature',None)
        if val: self.devices[0].attributes['temperature'] = round(int(val) / 100.0,1)
        val = data.get('humidity',None)
        if val: self.devices[1].attributes['humidity'] = round(int(val) / 100.0,1)
        val = data.get('pressure',None)
        if val: self.devices[2].attributes['pressure'] = round(int(val) / 100.0,1)

class Motion(AqaraDev):
    def setup(self):
        self.devices.append(devices.motion(self.base_addr+'00'))

    def on_report(self,data):
        val = data.get('status',None)
        if val and val == 'motion':
            self.devices[0].attributes['presence'] = True
        val = data.get('no_motion',None)
        if val:
            self.devices[0].attributes['presence'] = False


class Magnet(AqaraDev):
    def setup(self):
        dev = devices.door(self.base_addr+'00')
        dev.unsupported_methods = ['open','close']
        self.devices.append(dev)

    def on_report(self,data):
        status = data.get('status',None)
        if status and status == 'open':
            self.devices[0].attributes['position'] = True
        if status and status == 'close':
            self.devices[0].attributes['position'] = False


class Vibration(AqaraDev):pass


class Cube(AqaraDev):pass


class Gateway(AqaraDev):
    def setup(self):
        self.ip = None
        self.token = None
        self.rgb = None
        self.connect()
        lamp = devices.lamp(self.base_addr+'00')
        lamp.methods['on'] = self.lamp_on
        lamp.methods['off'] = self.lamp_off
        lamp.methods['rand']   = self.lamp_rand
        self.devices.append(lamp)

        siren = Device('siren.sound',self.base_addr+'01')
        siren.methods['play'] = self.siren_play
        siren.methods['stop'] = self.siren_stop
        self.devices.append(siren)

    @property
    def secret(self):
        return self._secret

    @secret.setter
    def secret(self,value):
        logger.debug('Seting GW secret to %s' % value)
        self._secret = value

    def make_key(self):
        cipher = AES.new(self.secret, AES.MODE_CBC, IV=AQARA_ENCRYPT_IV)  
        return binascii.hexlify(cipher.encrypt(self.token)).decode("utf-8")

    def connect(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.settimeout(0.5)

    def send(self,pkt):
        if not self.ip:
            logger.warning("GW not found, please wait")
            return
        try:
            print(pkt)
            self.sock.sendto(pkt,(self.ip,GW_PORT))
            ans = self.sock.recv(65507)
            return ans
        except Exception as e:
            logger.warning(e)

    def write(self,data = {}):
        key = self.make_key()
        data.update({"key":key})
        pload = {"cmd":"write",
                 "sid": self.sid,
                 "data" : data
                }
        pkt = ujson.encode(pload).encode('utf8')
        return self.send(pkt)

    ## RGB Leds 
    def get_rgb(self,red,green,blue,brightness=0xFF):
        return brightness<<24|( red << 16)|( green << 8)|blue

    def lamp_set(self,value):
        data = {"rgb" : value}
        print(self.write(data))

    def lamp_on(self):
        color = self.rgb or self.get_rgb(255,170,170)
        self.lamp_set(color)

    def lamp_off(self):
        self.lamp_set(0)

    def lamp_rand(self):
        import random
        red   = random.randint(0,255)
        green = random.randint(0,255)
        blue  = random.randint(0,255)
        rgb = self.get_rgb(red,green,blue)
        self.lamp_set(rgb)

    ## Siren go here
    def siren_play(self,_sound=26,_volume=5):
        data = {
                "mid" : _sound,
                "volume": _volume,
                }
        self.write(data)

    def siren_stop(self):
        data = { "mid" : 999 }
        print(self.write(data))

    def parse(self,pkt):
        # the Gateway need to parse the token addtionnal parameter
        cmd = pkt.get('cmd',None)
        if cmd == 'heartbeat':
            token = pkt.get('token',None)
            if token: self.token = token
        AqaraDev.parse(self,pkt)

    def on_heartbeat(self,data):
        ip = data.get('ip',None)
        if ip and ip != self.ip:
            self.ip = ip

    def on_report(self,data):
        rgb = data.get('rgb',None)
        if rgb:
            rgb = int(rgb)
            if rgb != 0:
                self.rgb = rgb