from xaal.lib import tools,Device,DeviceError

import requests
import logging
import platform

logger = logging.getLogger(__name__)

class API: 
    """ NetAtmo API """
    def __init__(self,configfile):
        self.configfile = configfile

    def get_token(self): 
        """ connect to netatmo cloud, return access token """
        ##read config
        cfg = self.configfile['config']
        payload = {
            'grant_type'      :   cfg['grant_type'],
            'client_id'       :   cfg['client_id'],
            'client_secret'   :   cfg['client_secret'],
            'password'        :   cfg['password'],
            'username'        :   cfg['username'],
            'scope'           :   cfg['scope']
        }
        try:
            response = requests.post("https://api.netatmo.com/oauth2/token", data=payload)
            response.raise_for_status()
            access_token=response.json()["access_token"]
            return access_token
        except requests.exceptions.RequestException:
            return None

    def get_data(self): #Fonction which get the information from netatmo API by using a token
        token=self.get_token()
        if token == None:
            return None

        cfg = self.configfile['config']
        params = {
            'access_token': token ,
            'device_id': cfg['device_id']
        }
        try:
            response = requests.post("https://api.netatmo.com/api/getstationsdata", params=params)
            response.raise_for_status()
            data = response.json()["body"]
            return data
        except requests.exceptions.RequestException:
            return None


class NAModule(object): # NWS: netatmo weather station

    def __init__(self,base_addr,group,macId=None,na_type=None):
        self.sensors=[]
        self.base_addr=base_addr
        self.group=group
        self.macId=macId
        self.na_type = na_type

    def build_dev(self,dtype,addr):
        dev            = Device(dtype)
        dev.devtype    = dtype
        dev.address    = addr
        dev.vendor_id  = "NETATMO"
        dev.product_id = "Netatmo:%s" % self.na_type
        dev.info       = "mac:%s" % self.macId
        return dev

    def new_sensor(self,sensor_type,sensor_attr,senor_addr,sensor_group):
        s_type=sensor_type+".basic"
        sensor = self.build_dev(s_type,senor_addr)
        for attr in sensor_attr :
            sensor.new_attribute(attr)
        sensor.group_id = sensor_group
        return sensor

    def update_sensor(self,sensor,sensor_attr,attr_value):
        if isinstance(sensor,Device) :
            attr=sensor.get_attribute(sensor_attr)
            if attr :
                attr.value=attr_value
        else:
            raise DeviceError("This sensor is invalid")

    def new_sensors(self,sensors_type_list):
        for i in range (len(sensors_type_list)) :
            sensor_type=sensors_type_list[i]
            sensor_attr=self.get_sensor_attr(sensor_type)
            sensor_addr= '%s%02x' % (self.base_addr[:-2],i+1)
            sensor=self.new_sensor(sensor_type,sensor_attr,sensor_addr,self.group)
            self.sensors.append(sensor)

    def update_sensors(self,attr_value_dic):
        for sensor in self.sensors :
            for sensor_attr,attr_value in attr_value_dic.items():
                self.update_sensor(sensor,sensor_attr,attr_value)

    def get_sensor_attr(self,sensor_type):
        if   sensor_type=="thermometer" :
            return ["temperature"]
        elif sensor_type=="hygrometer" :
            return ["humidity"]
        elif sensor_type=="barometer" :
            return ["pressure"]
        elif sensor_type=="co2meter" :
            return ["co2"]
        elif sensor_type=="soundmeter" :
            return ["sound"]
        elif sensor_type=="windgauge" :
            return ["windstrength","windangle","guststrength","gustangle"]
        elif sensor_type=="rainmeter" :
            return ["rain"]
        elif sensor_type=="radiometer" :
            return ["radio_status"]
        elif sensor_type=="wifimeter" :
            return ["wifi_status"]
        elif sensor_type=="batterymeter" :
            return ["battery_level"]
        else:
            logger.warn("invalid sensor type !")


class ConfigParser: # netatmo weather station config
    def __init__(self,configfile):
        self.cfg = configfile
    
    def update(self):
        if 'config' not in self.cfg:
             logger.error("invalid config file !!!")
        if 'addr' not in self.cfg['config']:
             self.cfg['config']['addr'] = tools.get_random_uuid()
        if 'devices' not in self.cfg:
            self.cfg['devices']={}
        
        self.update_devices()
        self.cfg.write()

    def update_devices(self):
        modules= self.get_modules()
        if modules == None:
            return
            
        for k in modules.keys():
            if k not in self.cfg['devices'] :
                self.cfg['devices'][k]={}
                self.cfg['devices'][k]['group_addr'] =tools.get_random_uuid()
                self.cfg['devices'][k]['base_addr']  =tools.get_random_uuid()[:-2] + '00'
                self.cfg['devices'][k]['type']       =modules[k]
                self.cfg['devices'][k].inline_comments['type']=self.get_comments(modules[k])
        
        for k in self.cfg['devices'] :
            if k not in modules.keys() :
                self.cfg['devices'][k]['type']='NoneType'
                self.cfg['devices'][k].inline_comments['type']=self.get_comments('NoneType')
                self.cfg['devices'].inline_comments[k]='This device is removed !!!'
                
    def get_modules(self):
        data = data=API(self.cfg).get_data()
        if data == None:
            logger.warning('Unable to fetch module list')
            return None

        # NAMain is the first devices
        main_module = data['devices'][0]
        result = {main_module['_id'] : main_module['type']}
        # other are embedded in modules
        modules = main_module['modules']
        for k in range(0,len(modules)):
            result.update({modules[k]['_id']:modules[k]['type']})
        return result

    def get_comments(self,netatmo_type):
        if netatmo_type=='NAMain':
            return 'mainIndoor'
        elif netatmo_type=='NAModule1':
            return 'additionOutdoor'
        elif netatmo_type=='NAModule2':
            return 'additionWindGauge'
        elif netatmo_type=='NAModule3':
            return 'additionRainGauge'
        elif netatmo_type=='NAModule4':
            return 'additionIndoor'
        else:
            return 'invalid netatmo type !!!'


