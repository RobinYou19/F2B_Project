
from xaal.lib import tools,Engine,Device
from xaal.monitor import Monitor,Notification
from xaal.schemas import devices

import platform
import atexit

PACKAGE_NAME = "xaal.conky"
logger = tools.get_logger(PACKAGE_NAME,'INFO')

monitor = None
need_update = False
conky_file = ''


def handler(event,dev):
    global need_update
    if event in [Notification.new_device,Notification.drop_device,Notification.attribute_change]:
        need_update = True

def display(dev):
    type_ = str(dev.devtype)
    attr  = dev.attributes
    if type_.startswith('thermometer.'):
        return '%s°' % attr.get('temperature','--')
    if type_.startswith('hygrometer.'):
        return '%s%%' % attr.get('humidity','--')
    if type_.startswith('windgauge.'):
        return attr.get('windStrength','--')
    if type_.startswith('co2meter.'):
        return attr.get('co2','--')
    if type_.startswith('lamp.'):
        val = attr.get('light',None)
        if val:return 'ON'
        return 'OFF'
    if type_.startswith('powerrelay.'):
        val = attr.get('power',None)
        if val:return 'ON'
        return 'OFF'     
    return None


def update_conky():
    global monitor,conky_file,need_update,conky_format
    if need_update:
        if conky_file:
            logger.debug('Writing file')
            f = open(conky_file,'w+')
            for dev in monitor.devices:
                name = dev.db.get('name',None)
                disp = display(dev)
                if name and disp:
                    f.write( conky_format % (name,disp))
                    f.write('\n')
            f.close()
    need_update = False

def setup_xaal(engine):
    """ setup xAAL Engine & Device. And start it in a Greenlet"""
    global monitor,conky_file,conky_format
    cfg = tools.load_cfg(PACKAGE_NAME)
    if not cfg:
        logger.info("No config file found, building a new one")
        cfg = tools.new_cfg(PACKAGE_NAME)
        cfg['config']['db_server'] = 'xxxxxx'
        cfg['config']['conky_file'] = '/tmp/xaal.conky'
        cfg['config']['conky_format'] = "${color grey}%s: ${alignr}${color}%s"
        cfg.write()
    config=cfg['config']
    db_server = config.get('db_server',None)
    addr = config.get('addr',None)
    conky_file = config.get('conky_file',None)
    conky_format = config.get('conky_format')
    dev = devices.hmi(addr)
    dev.product_id = "IHM for Conky"
    dev.version    = 0.1
    dev.info       = "%s@%s" % (PACKAGE_NAME,platform.node())
    engine.add_device(dev)
    
    monitor = Monitor(dev,db_server = db_server)
    monitor.subscribe(handler)
    engine.add_timer(update_conky,1)


def empty():
    global conky_file
    f = open(conky_file,'w+')
    f.write('')
    f.close()

def setup(engine):
    setup_xaal(engine)
    atexit.register(empty)
    return True