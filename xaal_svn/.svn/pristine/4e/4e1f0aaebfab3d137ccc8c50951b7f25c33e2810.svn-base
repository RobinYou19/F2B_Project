from xaal.schemas import devices
from xaal.lib import tools,Device

import logging

logger = logging.getLogger(__name__)


def split_color(color):
    data = color.split('#')[-1]
    r = int(data[0:2],16)
    g = int(data[2:4],16)
    b = int(data[4:6],16)
    return (r,g,b)


class YeelightDev(object):
    def __init__(self,bulb,addr):
        logger.info('New device at %s : %s' % (bulb._ip,addr))
        self.bulb = bulb
        self.addr = addr
        self.setup()
        self.set_properties()

    def set_properties(self):
        self.dev.vendor_id = 'Yeelight'

    def setup(self):
        logger.warning('Please overide setup()')


class RGBW(YeelightDev):
    def setup(self):
        dev = devices.lamp_dimmer(self.addr)
        dev.methods['on']  = self.on
        dev.methods['off'] = self.off
        dev.methods['toggle'] = self.toggle
        dev.methods['dim'] = self.dim
        dev.methods['setColor'] = self.set_color
        dev.methods['setTemp'] = self.set_temp
        dev.info = 'RGBW / %s' % self.addr
        self.dev = dev

    def on(self):
        self.bulb.turn_on()

    def off(self):
        self.bulb.turn_off()

    def toggle(self):
        self.bulb.toggle()

    def dim(self,_target):
        val = int(_target)
        self.bulb.set_brightness(val)

    def set_color(self,_target):
        r,g,b = split_color(_target)
        self.on()
        self.bulb.set_rgb(r,g,b)
        
    def set_temp(self,_target):
        val = int(_target)
        self.on()
        self.bulb.set_color_temp(val)



