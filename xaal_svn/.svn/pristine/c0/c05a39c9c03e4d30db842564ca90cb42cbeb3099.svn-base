from mako.template import Template
import sys
import os
import ujson
from pprint import pprint
SCHEMA_DIR='/home/jkx/Devel/xaal_schemas'
BLACK_LIST=['json-online-validator.sh','Makefile','schema','xAAL_05_application-layer','xAAL_05_security-layer','xAAL_06_application-layer.cddl','xAAL_06_security-layer.cddl','xAAL_schema','.svn','schemarepository.basic_notice.txt']

def name_to_method(name):
    if name.endswith('.basic'):
        return name.split('.basic')[0]
    else:
        return name.replace('.','_')
    

def dump(jsonDict):
    print("=" * 80)
    keys = list(jsonDict.keys())
    keys.sort()
    for k in keys:
        if k in ["notifications","attributes","methods"]:
            print("====== %s ======= " % k)
        else:
            print("== %s => " % k,)
        pprint(jsonDict[k])


class Schemas:
    
    def __init__(self):
        self.__cache = {} 

    def load(self,filename):
        """ load schema from disk, and put it in cache
            return the file as dict"""
        if filename in self.__cache.keys():
            return self.__cache[filename]

        path = os.path.join(SCHEMA_DIR,filename)
        #print("Loading %s" % path)
        data = open(path,'r').read()
        jsonDict = ujson.decode(data)
        self.__cache.update({filename:jsonDict})
        return jsonDict

        
    def get_extends(self,name):
        """return the chain list off extends in reverse order, any.any is the first item"""
        current = name 

        extends = [name,]
        while 1:
            tmp = self.load(current)
            if "extends" in tmp.keys():
                current = tmp["extends"]
                extends.append(current)
            else:
                break
        extends.reverse()
        return extends


    def get(self,name):
        """return an complete schema w/ all extends included"""
        ext = self.get_extends(name)
        res = self.load(name)

        tmpMethods = {} 
        tmpAttr = {} 
        tmpNotifs = {}
        for e in ext:
            _dict = self.load(e)

            if "methods" in _dict.keys():
                tmp = _dict["methods"]
                tmpMethods.update(tmp)
                
            if "attributes" in _dict.keys():
                tmp = _dict["attributes"]
                tmpAttr.update(tmp)

            if "notifications" in _dict.keys():
                tmp = _dict["notifications"]
                tmpNotifs.update(tmp)

        res["methods"] = tmpMethods
        res["attributes"] = tmpAttr
        res["notifications"] = tmpNotifs
        return res
        

    def get_devtypes(self):
        l = os.listdir(SCHEMA_DIR)
        r=[]
        for k in l:
            if k not in BLACK_LIST:
                r.append(k)
        r.sort()
        return r
            


class DeviceBuilder:
    def __init__(self):
        self.schemas = Schemas()
        self.basic = self.schemas.get('basic.basic')
        
    def is_basic_method(self,value):
        return value in self.basic['methods']
        
    def is_basic_attribute(self,value):
        return value in self.basic['attributes']

    def is_basic_notification(self,value):
        return value in self.basic['notifications']

    def get_schema(self,name):
        return self.schemas.get(name)

    def build(self,name):
        data = self.schemas.get(name)
        tmpl = Template(filename='dev.mako')

        attributes = {}
        for k in data['attributes']:
            if not self.is_basic_attribute(k):
                dict_ = data['attributes'][k]
                attributes.update({k:dict_})

        methods = {}
        for k in data['methods']:
            if not self.is_basic_method(k):
                dict_ = data['methods'][k]
                #print("%s: %s %s" % (k,dict_['description'],list(dict_['parameters'].keys())))
                methods.update({k:dict_})
        args = {}
        args['name'] = name_to_method(name)
        args['doc'] = data['description']
        args['devtype'] = name
        args['attributes'] = attributes
        args['methods'] = methods
                
        print(tmpl.render(**args))
                
    def build_all(self):
        devs = self.schemas.get_devtypes()
        for k in devs:
            self.build(k)
            #print()
        
                

                
db = DeviceBuilder()
#r  = db.get_schema('thermometer.basic')
#db.build('lamp.dimmer')
#db.build('mediaplayer.basic')
#db.build(sys.argv[1])
print("from xaal.lib import Device,tools")
print("import logging")
print("logger = logging.getLogger(__name__)")
print("from xaal.lib import tools")
print()

db.build_all()
