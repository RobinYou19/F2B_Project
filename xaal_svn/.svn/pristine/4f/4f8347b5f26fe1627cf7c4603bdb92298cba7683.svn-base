from xaal.lib import Device,tools,config

import sys
import time
import platform
import urllib3
import logging

PACKAGE_NAME = "xaal.warp10"
logger = logging.getLogger(PACKAGE_NAME)

# period between two push
PUSH_RATE = 60 
DATA_BUF = ''

class WARP10Logger:
    def __init__(self,engine):
        self.eng = engine
        # change xAAL call flow
        self.eng.add_rx_handler(self.parse_msg)
        self.cfg = tools.load_cfg_or_die(PACKAGE_NAME)['config']
        self.setup()

    def setup(self):
        dev = Device("logger.basic")
        dev.address    = self.cfg['addr']
        dev.vendor_id  = "IHSEV"
        dev.product_id = "WARP10 Logger"
        dev.info       = "%s@%s" % (PACKAGE_NAME,platform.node())
        self.eng.add_device(dev)
        self.http = urllib3.PoolManager()
        self.eng.add_timer(self.push,PUSH_RATE)

    def push(self):
        global DATA_BUF
        if len(DATA_BUF)==0:
            return
        try:
            rsp = self.http.request('POST', self.cfg['url'],headers={'X-Warp10-Token':self.cfg['token']},body=DATA_BUF,retries=2)
        except Exception:
            # no need to log since, urllib3 already log errors
            return
        if rsp.status != 200:
            logger.error('%s: %s' % (rsp.status,rsp.reason))
            # warp10 will rise an internal error if data contain contain a wrong pload
            # I decided to drop this data, because we will loop until death here
            if rsp.status == 500:
                DATA_BUF=''
            return
        DATA_BUF = ''

    def parse_msg(self,msg):
        global DATA_BUF
        if msg.is_attributes_change():
            base = self.cfg['topic'] + '.' + msg.devtype
            buf = ''
            now = round(time.time() * 1000000)
            for k in msg.body:
                name = '%s.%s' % (base,k)
                tags  = '{devid=%s}' % msg.source
                value = msg.body[k]
                if value != None and type(value)!=list:
                    buf = buf +"%s// %s%s %s\n" % (now,name,tags,value)
            DATA_BUF = DATA_BUF + buf

def setup(engine):
    WARP10Logger(engine)
    return True

