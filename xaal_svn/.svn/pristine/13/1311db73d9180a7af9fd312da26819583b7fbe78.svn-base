from xaal.lib import Device,Engine,tools,Message
import platform
from enum import Enum
import time

DELAY = 50

ADDR = 'aa4d1cbc-92af-11e8-80cd-408d5c18c800'
PKG_NAME = 'alarm'

DOOR   = 'dbeed1b4-91a6-11e8-a717-408d5c18c8f7'
#DOOR   = '42775a2e-92af-11e8-ae30-408d5c18c800'
SIREN  = '9e2d91a0-905a-11e8-9cdd-02150400d000'
FLASH  = '9e2d91a0-905a-11e8-9cdd-02150400d001'
BULLET = 'ef1187ce-9119-11e8-9daa-408d5c18c8f7'

logger = tools.get_logger(PKG_NAME,'DEBUG')


class States(Enum):
    disabled      = 'disabled'
    armed         = 'armed'
    wait_entrance = 'wait_entrance'
    wait_exit     = 'wait_exit'
    siren         = 'siren'


dev = None
state = States.disabled
timer = 0

def send(targets,action,body=None):
    global dev
    engine = dev.engine
    engine.send_request(dev,targets,action,body)


def start_alert():
    logger.warning('ALARM !!!!')
    send([BULLET],'notify',{'title':'Alarm !!','msg':"Intrusion en cours"})
    send([FLASH],'on')
    send([SIREN],'on')

def stop_alert():
    send([SIREN],'off')
    send([FLASH],'off')

def notify(msg):
    send([BULLET],'notify',{'title':'Notif alarm','msg':msg})


def update_state_attribute():
    global dev
    dev.attributes['state']=state.value

def handle_msg(msg):
    global state,timer
    # search for the buttons 
    if msg.is_notify():
        if msg.action == 'long_click_press':
            # you have x seconds to exit
            if state == States.disabled:
                state = States.wait_exit
                timer=time.time()
                notify('Départ de la maison')
                update_state_attribute()
                return
            # you have disabled the alarm
            if state in [States.armed,States.wait_entrance,States.siren,States.wait_exit]:
                state = States.disabled
                stop_alert()
                notify('Alarme désactivée')
                update_state_attribute()
                return

    # windows & doors  
    #msg = Message()
    if msg.is_attributes_change():
        if msg.devtype in ['window.basic','door.basic']:
            pos = msg.body.get('position',None)
            if pos == True:
                if state == States.armed:
                    if msg.source == DOOR:
                        state = States.wait_entrance
                        notify('Ouverture porte')
                        timer = time.time()
                    else:
                        state = States.siren
                        start_alert()
                update_state_attribute()

def update():
    global state,timer
    now = time.time()
    if state == States.wait_exit:
        if now > (timer + DELAY):
            state = States.armed
            notify("Alarme activée")

    if state == States.wait_entrance:
        if now > (timer + DELAY):
            state = States.siren
            start_alert()
    update_state_attribute()


def main():
    global dev
    dev = Device('alarm.jkx',ADDR)
    dev.info = '%s@%s' % (PKG_NAME,platform.node())
    dev.new_attribute('state')
    engine = Engine()
    engine.add_device(dev)
    engine.add_rx_handler(handle_msg)
    engine.add_timer(update,1)
    engine.run()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Bye bye')
