
from xaal.lib import Device,Engine,tools
import sys

def main(addr):
    if addr == None:
        addr = tools.get_random_uuid()
    dev = Device("lamp.dimmer",addr)
    dev.product_id = 'Dummy Dimming Lamp'
    dev.url = 'http://www.acme.org'
        
    # attributes
    light = dev.new_attribute('light')
    dimmer = dev.new_attribute('dimmer',50)

    dev.dump()
    
    # methods 
    def on():
        light.value = True
        print("%s ON" % dev)
    
    def off():
        light.value = False
        print("%s OFF" %dev)
    
    def dim(_target):
        val = int(_target)
        if (val <= 100) and (val >=0):
            dimmer.value = val
            print("Dimming to %d" % val)
    
    dev.add_method('on',on)
    dev.add_method('off',off)
    dev.add_method('dim',dim)

    eng = Engine()
    eng.add_device(dev)
    eng.run()


if __name__ =='__main__':
    try:
        addr = None
        if len(sys.argv) > 1:
            addr = sys.argv[-1]
        main(addr)
    except KeyboardInterrupt:
        pass
