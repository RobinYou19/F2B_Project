from gevent import monkey; monkey.patch_all()
import gevent

from xaal.lib import tools,Device
from .network import AqaraConnector
from . import devices

import inspect
import atexit
import logging

PACKAGE_NAME = 'xaal.aqara'
logger = logging.getLogger(PACKAGE_NAME)

def find_device_class(model):
    if model in ['sensor_switch.aq3','sensor_switch.aq2','switch','86sw1']:
        return devices.Switch
    if model == '86sw2':
        return devices.Switch86sw2
    if model == 'gateway':
        return devices.Gateway
    if model == 'weather.v1':
        return devices.Weather
    if model in ['motion','sensor_motion.aq2']:
        return devices.Motion
    if model in ['magnet','sensor_magnet.aq2']:
        return devices.Magnet
    if model == 'vibration':
        return devices.Vibration
    if model == 'sensor_cube.aqgl01':
        return devices.Cube
    return None

class GW(gevent.Greenlet):
    def __init__(self,engine):
        gevent.Greenlet.__init__(self)
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

    def add_device(self,sid,model,base_addr):
        klass = find_device_class(model)
        if klass:
            dev = klass(sid,model,base_addr)
            self.engine.add_devices(dev.devices)
            self.devices.update({sid:dev})
            return dev
        else:
            logger.info('Unsupported device %s/%s' % (model,sid))
            return None

    def setup(self):
        self.aqara = AqaraConnector()
        devs = self.cfg['devices']
        for sid in devs:
            cfg = devs[sid]
            model = cfg.get('model',None)
            base_addr = cfg.get('base_addr',None)
            # TBD : Merge this w/ handle new device
            if model and base_addr:
                dev = self.add_device(sid,model,base_addr)
                if dev and model == 'gateway':
                    dev.secret = devs[sid].get('secret',None)
    
    def _run(self):
        while 1:
            pkt = self.aqara.receive()
            if pkt:
                self.handle(pkt)

    def handle(self,pkt):
        sid = pkt.get('sid',None)
        if not sid: return
        dev = None
        if sid in self.devices.keys():
            dev = self.devices[sid]
        else:
            model = pkt.get('model',None)
            if not model:return
            base_addr = tools.get_random_uuid()[:-2]
            dev = self.add_device(sid,model,base_addr)
            if dev:
                cfg = {'base_addr' : base_addr,'model':model}
                self.cfg['devices'].update({sid:cfg})
        if dev:
            dev.parse(pkt)

    def _exit(self):
        cfg = tools.load_cfg(PACKAGE_NAME)
        if cfg != self.cfg:
            logger.info('Saving configuration file')
            self.cfg.write()

def setup(eng):
    logger.info('Starting %s' % PACKAGE_NAME)
    GW.spawn(eng)
    return True
