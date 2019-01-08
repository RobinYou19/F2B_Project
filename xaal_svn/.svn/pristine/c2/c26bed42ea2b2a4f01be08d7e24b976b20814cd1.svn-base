import os
import importlib

product_list = []

def register(klass):
    product_list.append(klass)

def get():
    r = {} 
    for klass in product_list:
        l = []
        for p in klass.PRODUCTS:
            l.append('%s:%s' % (klass.MANUFACTURER_ID,p))
        r.update({klass:l})
    return r

def search(product_id):
    prod_map = get()
    for k in prod_map :
        if product_id in prod_map[k]:
            return k

def _import():
    home = os.path.dirname(__file__)
    for path in os.listdir(home):
        if path.startswith('__'):
            continue
        print("Loading product %s" % path)
        try:
            importlib.import_module('.'+path,"xaal.zwave.products")
        except Exception as err:
            print("Error loading [%s] : %s" % (path,err))
        
_import()
        
#from . import Fibaro,Aeotec,Everspring,Zipato


