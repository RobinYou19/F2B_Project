from xaal.lib import tools,helpers,Engine,Device
import platform
import logging

PACKAGE_NAME = "xaal.gtknotify"
logger = logging.getLogger(PACKAGE_NAME)

import gi
gi.require_version('Notify', '0.7')
from gi.repository import Notify

def register_device(engine):
    cfg = tools.load_cfg(PACKAGE_NAME)
    if not cfg:
        logger.info('Missing config file, building a new one')
        cfg = tools.new_cfg(PACKAGE_NAME)
        cfg.write()
    
    dev = Device("notification.desktop")
    dev.address     = cfg['config']['addr']
    dev.product_id = "GTK Notification device"
    dev.vendor_id  = "IHSEV TEAM"
    dev.version    = 0.1
    dev.info       = "%s@%s" % (PACKAGE_NAME,platform.node())
    dev.add_method('notify',notify)
    engine.add_device(dev)
    notify(PACKAGE_NAME,'started')
                  
def notify(_title,_msg):
    if Notify.init("xAALNotifications"):
        notify = Notify.Notification.new('xAAL: %s' % _title,_msg,"dialog-information")
        try:
            notify.show()
        except:pass

def setup(engine):
    register_device(engine)
    return True
