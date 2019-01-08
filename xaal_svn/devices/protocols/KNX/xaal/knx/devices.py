from xaal.schemas import devices
from xaal.lib import tools

from .bindings import funct

import logging
from functools import partial

logger = logging.getLogger(__name__)

class KNXDev:
    def __init__(self,gw,cfg):
        #print(extract_classname(self))
        self.gateway= gw
        self.cfg = cfg
        self.attributes_binding = {}
        # search for xaal address, if None, the device will produce a new one
        self.addr = cfg.get('addr',None)
        if self.addr == None:
            cfg['addr'] = self.addr = tools.get_random_uuid()
            gw.save_config = True
        self.dev = None
        self.setup()


    def setup(self):
        logger.warn("Please define setup() in this device")

    def write(self,group_addr,dpt,data):
        """ return a function to be call to write the data to right group_addr """
        func = partial(self.gateway.knx.write,group_addr,data,dpt)
        return func

    def bind_attribute(self,attribute,group_addr,func,dpt):
        """ bind a group_addr to a xaal attribute, and apply the func """
        ptr = partial(func,attribute,dpt,data=None)
        self.attributes_binding.update({group_addr: ptr})

    def parse(self,cemi):
        if cemi.group_addr in self.attributes_binding:
            func = self.attributes_binding[cemi.group_addr]
            func(data=cemi.data)

# =============================================================================
# PowerRelay / Lamp .. 
# =============================================================================
class OnOffMixin:
    def setup_onoff(self,state_attribute):
        cmd = self.cfg.get('cmd',None)
        if cmd:
            self.dev.add_method('on', self.write(cmd,'1',1))
            self.dev.add_method('off',self.write(cmd,'1',0))
        state = self.cfg.get('state',None) or cmd
        mod   = self.cfg.get('mod','bool')
        if state:
            self.bind_attribute(state_attribute,state,funct[mod],'1')
        self.dev.info = "KNX %s"  % cmd or state

class PowerRelay(KNXDev,OnOffMixin):
    def setup(self):
        self.dev = devices.powerrelay(self.addr)
        self.setup_onoff(self.dev.get_attribute("power"))

class PowerRelayToggle(KNXDev,OnOffMixin):
    def setup(self):
        self.dev = devices.powerrelay_toggle(self.addr)
        self.setup_onoff(self.dev.get_attribute("power"))
        toggle = self.cfg.get('toggle',None)
        if toggle:
            self.dev.add_method('toggle', self.write(toggle,'1',1))

class Lamp(KNXDev,OnOffMixin):
    def setup(self):
        self.dev = devices.lamp(self.addr)
        self.setup_onoff(self.dev.get_attribute("light"))

class Switch(KNXDev):
    def setup(self):
        self.dev = devices.switch(self.addr)
        state = self.cfg.get('state',None)
        if state:
            self.bind_attribute(self.dev.get_attribute('position'),state,funct['bool'],'1')
            self.dev.info = "KNX %s"  % state


# =============================================================================
# Sensors 
# =============================================================================
class PowerMeter(KNXDev):
    def setup(self):
        self.dev = devices.powermeter(self.addr)
        self.dev.unsupported_attributes = ['devices']
        power   = self.cfg.get('power',None)
        p_dpt   = self.cfg.get('power_dpt','9')
        p_mod   = self.cfg.get('power_mod','set')
        if power:
            self.bind_attribute(self.dev.get_attribute('power'),power,funct[p_mod],p_dpt)
        energy = self.cfg.get('energy',None)
        e_dpt  = self.cfg.get('energy_dpt','9')
        e_mod  = self.cfg.get('energy_mod','set')
        if energy:
            self.bind_attribute(self.dev.get_attribute('energy'),energy,funct[e_mod],e_dpt)
        self.dev.info = "KNX %s"  % (power or energy)
        