from xaal.lib import Device,Engine,tools
import sys

if (len(sys.argv) !=3):
    print("Usage : %s title message" % sys.argv[0])
else:
    # try to find the same address
    cfg = tools.load_cfg_or_die('xaal.gtknotify')
    target = cfg['config']['addr']

    dev = Device("test.basic",tools.get_random_uuid())
    eng = Engine()
    eng.add_device(dev)
    title = sys.argv[1]
    msg = sys.argv[2]
    eng.send_request(dev,[target,],'notify',{'title' : title,'msg' : msg})
    eng.start()
    eng.loop()


