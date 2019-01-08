from xaal.zwave import core


class ZW100(core.ZDevice):
    """ Aeotec MultiSensor 6"""
    
    MANUFACTURER_ID = '0x0086'
    PRODUCTS = ['0x0064:0x0002',]

    def setup(self):
        # temperature
        dev = self.new_device("thermometer.basic")
        dev.new_attribute("temperature")
        # humidity
        dev = self.new_device("hygrometer.basic")
        dev.new_attribute('humidity')
        # luxmeter
        dev = self.new_device("luxmeter.basic")
        dev.new_attribute('lux')
        dev.new_attribute('ultraviolet')
        # motion sensor
        dev = self.new_device("motion.basic")
        dev.new_attribute("motion")
        # shock sensor
        dev = self.new_device("shock.basic")
        dev.new_attribute("shock")
        # battery
        dev = self.new_device("battery.basic")
        dev.new_attribute("level")
        
        # zwave values mapping
        self.monitor_value('temperature',core.COMMAND_CLASS.SENSOR_MULTILEVEL,1,1)
        self.monitor_value('humidity',core.COMMAND_CLASS.SENSOR_MULTILEVEL,1,5)
        self.monitor_value('lux',core.COMMAND_CLASS.SENSOR_MULTILEVEL,1,3)
        self.monitor_value('ultraviolet',core.COMMAND_CLASS.SENSOR_MULTILEVEL,1,27)
        self.monitor_value('burglar',core.COMMAND_CLASS.ALARM,1,10)
        self.monitor_value('battery',core.COMMAND_CLASS.BATTERY,1,0)
        
    def handle_value_changed(self,value):
        # thermometer
        if value == self.get_value('temperature'):
            self.devices[0].attributes["temperature"] = round(value.data,1)
        # hygrometer
        if value == self.get_value('humidity'):
            self.devices[1].attributes['humidity'] = round(value.data)
        # luxmeter
        if value == self.get_value('lux'):
            self.devices[2].attributes['lux'] = round(value.data)
        if value == self.get_value('ultraviolet'):
            self.devices[2].attributes['ultraviolet'] = round(value.data)
        # motion & shock
        if value == self.get_value('burglar'):
            if value.data == 8:
                self.devices[3].attributes['motion'] = True
            if value.data == 3:
                self.devices[4].attributes['shock'] = True
            if value.data == 0:
                self.devices[3].attributes['motion'] = False
                self.devices[4].attributes['shock']  = False
        # battery
        if value == self.get_value('battery'):
            self.devices[5].attributes['level'] = value.data
            
