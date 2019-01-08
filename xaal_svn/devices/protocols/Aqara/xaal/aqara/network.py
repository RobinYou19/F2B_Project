
# xaal use multicast cnx too, so reuse it here. 
# TODO : drop this 

from xaal.lib import network 

import logging
import ujson

logger = logging.getLogger(__name__)


class AqaraConnector:
    def __init__(self):
        self.nc = network.NetworkConnector('224.0.0.50',9898,10)
        self.nc.connect()

    def receive(self):
        buf = self.nc.receive()
        if buf:
            try:
                return ujson.decode(buf)
            except ValueError:
                logger.debug('JSON decoder Error %s' % buf)
        return None


