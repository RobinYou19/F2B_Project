from xaal.zwave import core

class FGWPE(core.ZDevice):
    """ Fibaro FGWPE/F Wall Plug"""
    
    MANUFACTURER_ID = '0x010f'
    PRODUCTS = ['0x1000:0x0600','0x1001:0x0602']
    
    def setup(self):
        # powerrelay 
        relay = self.new_device("powerrelay.basic")
        relay.add_method('on',self.on)
        relay.add_method('off',self.off)
        relay.new_attribute("power")
        # powermeter
        power = self.new_device("powermeter.basic")
        power.new_attribute("power")
        # map zwave var to 
        self.monitor_value('relay',core.COMMAND_CLASS.SWITCH_BINARY)
        self.monitor_value('power',core.COMMAND_CLASS.SENSOR_MULTILEVEL,1,4)
        
    def on(self):
        self.set_value('relay',True)

    def off(self):
        self.set_value('relay',False)
        
    def handle_value_changed(self,value):
        if value == self.get_value('relay'):
            self.devices[0].attributes['power']=value.data

        if value == self.get_value('power'):
            self.devices[1].attributes['power']=round(value.data)
