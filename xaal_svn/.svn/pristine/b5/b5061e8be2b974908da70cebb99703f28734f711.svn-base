from xaal.knx import knxrouter
import sys

knx = knxrouter.KNXConnector('2.2.2')
addr = sys.argv[1]       # ie 9/0/2
data = float(sys.argv[2]) # ie 200
dpt  = sys.argv[3]      # ie '9'
knx.write(addr,data,dpt)
