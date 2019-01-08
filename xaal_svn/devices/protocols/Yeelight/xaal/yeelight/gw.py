#from gevent import monkey; monkey.patch_all()
#import gevent

from xaal.lib import tools
from . import devices

import yeelight
import atexit
import logging

PACKAGE_NAME = 'xaal.yeelight'
logger = logging.getLogger(PACKAGE_NAME)

class GW(object):
    def __init__(self,engine):
        self.engine = engine
        self.devices = {}
        atexit.register(self._exit)
        self.config()
        self.setup()
        
    def config(self):
        cfg = tools.load_cfg(PACKAGE_NAME)
        if not cfg:
            cfg= tools.new_cfg(PACKAGE_NAME)
            cfg['devices'] = {}
            logger.warn("Created an empty config file")
            cfg.write()
        self.cfg = cfg


    def setup(self):
        logger.info("Searching for bulbs")
        bulbs = yeelight.discover_bulbs()
        cfg = self.cfg['devices']
        for k in bulbs:
            tmp = cfg.get(k['ip'],None)
            addr = None
            if tmp:
                addr = tmp.get('addr',None)
            if not addr:
                addr = tools.get_random_uuid()
                cfg[k['ip']] = {'addr':addr}
            bulb = yeelight.Bulb(k['ip'],k['port'])
            dev = devices.RGBW(bulb,addr)
            self.engine.add_device(dev.dev)
    
    def _exit(self):
        cfg = tools.load_cfg(PACKAGE_NAME)
        if cfg != self.cfg:
            logger.info('Saving configuration file')
            self.cfg.write()

def setup(eng):
    GW(eng)
    return True
