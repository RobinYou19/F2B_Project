
from xaal.schemas import devices 
from xaal.lib import helpers

def setup(engine):
    dev = devices.lamp()
    dev.product_id = 'Dummy Mini Lamp'
    dev.dump()

    # methods 
    def on():
        dev.attributes['light'] = True
    
    def off():
        dev.attributes['light'] = False
        
    dev.methods['on']  = on 
    dev.methods['off'] = off
    
    engine.add_device(dev)
    return True

if __name__ =='__main__':
    helpers.run_package('lamp_minimal',setup)