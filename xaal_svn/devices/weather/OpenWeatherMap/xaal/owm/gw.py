import platform
import atexit
import logging

import pyowm
from pyowm.exceptions import OWMError
from xaal.lib import tools
from xaal.schemas import devices

PACKAGE_NAME = "xaal.owm"
RATE = 300 # update every 5 min
API_KEY = '3a5989bac31472cd41d69e92838bd454'

logger = logging.getLogger(PACKAGE_NAME)

def setup_dev(dev):
    dev.vendor_id  = "IHSEV"
    dev.product_id = "OpenWeatherMap"
    dev.info       = "%s@%s" % (PACKAGE_NAME,platform.node())
    dev.url        = "https://www.openweathermap.org"
    dev.version    = 0.2
    return dev

class GW:
    def __init__(self,engine):
        self.eng = engine
        atexit.register(self._exit)
        cfg = tools.load_cfg(PACKAGE_NAME)
        if cfg == None:
            logger.info('New  config file')
            cfg = tools.new_cfg(PACKAGE_NAME)
            cfg.write()
        if not cfg.get('config',None): cfg['config'] = {}
        self.cfg = cfg
        self.setup()

    def get_config_addr(self,key):
        """ return a new xaal address and flag an update"""
        cfg = self.cfg['config']
        if cfg.get(key,None) == None:
            cfg[key] = tools.get_random_uuid()
            logger.info("New device addr : %s = %s" % (key,cfg[key]))
        return cfg[key]

    def setup(self):
        """ create devices, register .."""
        # devices
        self.devs = [] 
        self.devs.append(devices.thermometer(self.get_config_addr('temperature')))
        self.devs.append(devices.hygrometer(self.get_config_addr('humidity')))
        self.devs.append(devices.barometer(self.get_config_addr('pressure')))
        wind = devices.windgauge(self.get_config_addr('wind'))
        wind.unsupported_attributes.append('gustAngle')
        wind.del_attribute(wind.get_attribute('gustAngle'))
        self.devs.append(wind)

        # gw 
        gw = devices.gateway(self.get_config_addr('addr'))
        gw.attributes['embedded'] = [dev.address for dev in self.devs]

        for dev in (self.devs + [gw,]):
            setup_dev(dev)

        self.eng.add_devices(self.devs + [gw,])
        # OWM stuff
        self.eng.add_timer(self.update,RATE)
        # API Key
        api_key = self.cfg['config'].get('api_key',None)
        if not api_key:
            self.cfg['config']['api_key'] = api_key = API_KEY
        # Place 
        self.place = self.cfg['config'].get('place',None)
        if not self.place:
            self.cfg['config']['place'] = self.place = 'Brest,FR'
        # We are ready
        self.owm = pyowm.OWM(api_key)

    def update(self):
        try:
            self._update()
        except OWMError as e:
            logger.warn(e)

    def _update(self):
        weather = self.owm.weather_at_place(self.place).get_weather()
        self.devs[0].attributes['temperature'] = round(weather.get_temperature(unit='celsius').get('temp',None),1)
        self.devs[1].attributes['humidity']    = weather.get_humidity()
        self.devs[2].attributes['pressure']    = weather.get_pressure().get('press',None)
        wind = weather.get_wind().get('speed',None)
        if wind: wind = round(wind * 3600 / 1000, 1) # m/s => km/h
        self.devs[3].attributes['windStrength'] = wind
        self.devs[3].attributes['windAngle'] = weather.get_wind().get('deg',None)
        self.devs[3].attributes['gustStrength'] = weather.get_wind().get('gust',None)

    def _exit(self):
        cfg = tools.load_cfg(PACKAGE_NAME)
        if cfg != self.cfg:
            logger.info('Saving configuration file')
            self.cfg.write()


def setup(engine):
    gw = GW(engine)
    return True
