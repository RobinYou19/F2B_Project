from xaal.lib import Engine
from xaal.schemas import devices
import platform

PKG_NAME = 'btn_relay'

REL1 = '059111c6-7cb7-11e8-93ce-408d5c18c8f7'
REL2 = '05912044-7cb7-11e8-93ce-408d5c18c8f7'

BTN1 = 'ec069c08-92af-11e8-80cd-408d5c18c800'
BTN2 = '6fa87ef2-9975-11e8-b1fa-82ed25e6aa00'
BTN3 = '821c6026-92ae-11e8-82af-408d5c18c800'

dev = None

def send(targets,action,body=None):
    global dev
    engine = dev.engine
    engine.send_request(dev,targets,action,body)


def handle_msg(msg):
    if not msg.is_notify():
        return
    # search for the buttons 
    if msg.action == 'click':
        if msg.source == BTN2:
            send([REL1,REL2],'toggle')
        if msg.source == BTN1:
            send([REL1],'toggle')
        if msg.source == BTN3:
            send([REL2,],'toggle')            
    if msg.action == 'double_click':
        if msg.source in [BTN1,BTN3]:
            send([REL1,REL2],'off')


def main():
    global dev
    dev = devices.basic()
    dev.info = '%s@%s' % (PKG_NAME,platform.node())
    engine = Engine()
    engine.add_device(dev)
    engine.add_rx_handler(handle_msg)
    engine.run()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Bye bye')
