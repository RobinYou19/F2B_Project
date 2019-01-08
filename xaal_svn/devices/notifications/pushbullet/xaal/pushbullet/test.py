from xaal.lib import Device,Engine,tools
import sys

# try to find the same address
cfg = tools.load_cfg_or_die('xaal.pushbullet')
target = cfg['config']['addr']

dev = Device("test.basic",tools.get_random_uuid())
eng = Engine()
eng.add_device(dev)
eng.start()

title = sys.argv[1]
msg = sys.argv[2]

eng.send_request(dev,[target,],'notify',{'title' : title,'msg' : msg})
eng.loop()


