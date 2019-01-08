from xaal.zwave import core


class RGBBulb(core.ZDevice):
    MANUFACTURER_ID = '0x0131'
    PRODUCTS = ['0x0002:0x0002',]

    def setup(self):
        lamp = self.new_device("lamp.rgb")
        # attributes
        lamp.new_attribute("light")
        lamp.new_attribute("dimmer")
        # methods
        lamp.add_method('on',self.on)
        lamp.add_method('off',self.off)
        lamp.add_method('dim',self.dim)
        self.monitor_value('level',core.COMMAND_CLASS.SWITCH_MULTILEVEL)

    def set_level(self,value):
        self.set_value('level',value)
        self.gw.engine.add_timer(self.get_value('level').refresh,1,2)
        
    def on(self):
        self.set_level(0x63)

    def off(self):
        self.set_level(0)

    def dim(self,value):
        if (value > 0) and (value <100):
            self.set_level(value)

    def handle_value_changed(self,value):
        if value == self.get_value('level'):
            dev = self.devices[0]
            dev.attributes["dimmer"] = value.data
            if value.data == 0:
                dev.attributes["light"] = False
            else:
                dev.attributes["light"] = True
