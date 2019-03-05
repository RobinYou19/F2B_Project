from .default import view,route,xaal_core

from bottle import request,redirect,get,post, static_file

import copy, json, os, hashlib

#GLOBAL VARIABLES

def get_config_file():
  this_directory = os.path.dirname(os.path.abspath(__file__))
  logins = '/../../../Logins/logins.txt'
  logins_path = this_directory + logins
  my_logins = open(logins_path, 'r')
  my_lines = my_logins.readlines()

  try :
    login = my_lines[0]
    filename = '/../../../Configuration/config_' + login +'.json'
    config_path = this_directory + filename

    with open(config_path) as f:
      data = json.load(f)
  except :
    data = "Sorry but you're not welcome here !"
  my_logins.close()
  return data

#################################################################
#@ MENU PAGES

@route ('/login')
@view ('login.mako')
def login():
  r =  {'title' : 'Login'}
  return r

@route ('/login', method='POST')
@view('menu.mako')
def do_login():
  authenticated = False
  this_directory = os.path.dirname(os.path.abspath(__file__))
  hash_object = hashlib.sha256(request.forms.get("password").encode('utf-8'))
  hash_pwd = hash_object.hexdigest()
  filename = '/../../../Database/db.txt'
  config_path = this_directory + filename
  my_file = open(config_path, 'r')
  lines = my_file.readlines()
  log_file = '/../../../Logins/logins.txt'
  config_path = this_directory + log_file
  my_file_2 = open(config_path, 'w')

  for i in range(len(lines)//2):
    if (lines[2*i].replace('\n','') == request.forms.get("pseudo")) and (lines[2*i+1] == str(hash_pwd)) :
        authenticated = True
        my_file_2.write(request.forms.get("pseudo"))
  
  my_file_2.close()
  my_file.close()
  if authenticated :
    print('Authentication Granted')
  else :
    print('Authentication Failed')
  r = {'title' : 'Menu'}
  data = get_config_file()
  try :
    r.update({'menu' : data['pages']['menu']})
  except :
    print('Try to log in again ...')
  return r

@route('/menu')
@view('menu.mako')
def menu():
    data = get_config_file()
    r =  {'title' : 'Menu'}
    r.update({'menu' : data['pages']['menu']})
    return r

@route('/house')
@view('house.mako')
def get_devices_house():
    data = get_config_file()
    r = {'title' : 'House'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'house' : data['pages']['house']})
    return r

@route('/modules')
@view('modules.mako')
def modules():
    data = get_config_file()
    r = {'title':'Modules'}
    r.update({'modules' : data['pages']['modules']})
    return r

@route('/scenarios')
@view('scenarios.mako')
def scenarios():
    data = get_config_file()
    r = {'title':'Scenarios'}
    r.update({'scenarios' : data['pages']['scenarios']})
    return r

@route('/favorites')
@view('favorites.mako')
def favorites():
    data = get_config_file()
    r = {'title':'Favorites'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'favorites' : data['pages']['favorites']})
    return r

@route('/configuration')
@view('configuration.mako')
def configuration():
    data = get_config_file()
    r = {'title' : 'Configuration'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'configuration' : data['pages']['configuration']})
    return r

@route('/config_file')
@view('configuration_file.mako')
def configuration():
    data = get_config_file()
    r = {'title' : 'Configuration File'}
    r.update({'data' : data})
    return r

@route('/config_device')
@view('configuration_device.mako')
def configuration():
    data = get_config_file()
    r = {'title' : 'Configuration Device'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    return r

@get('/edit_metadata/<addr>')
@view('edit_metadata.mako')
def edit_metadata(addr):
    data = get_config_file()
    r = {'title' : 'device %s' % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({'dev' : dev})
    return r


@post('/edit_metadata/<addr>')
@view('edit_metadata.mako')
def save_metadata(addr):
    data = get_config_file()
    form = dict(request.forms.decode()) # just to shut up lint
    kv = {}
    for k in form:
        key = str(k)
        if form[k]=='': continue
        if key.startswith('key_'):
            id_ = key.split('key_')[-1]
            v_key = 'value_'+id_
            if v_key in form:
                if form[v_key] =='':
                    value = None
                else:
                    value = form[v_key]
                kv.update({form[k]:value})
    xaal_core.update_kv(addr,kv)
    return edit_metadata(addr)
    

@route('/account')
@view('account.mako')
def account():
    data = get_config_file()
    r = {'title' : 'Account'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'bug_var' : data['pages']['account']})
    return r


#################################################################
#@ MODULE PAGES

@route('/modules/<module>')
@view('module.mako')
def module(module):
    helper = {"Type" : 0, "Localisation" : 1}
    data = get_config_file()
    r = {'title': module}
    r.update({'modules' : data['pages']['modules']})
    r.update({'objects' : data['pages']['modules'][helper[module]]['objects']})
    return r

@route('/modules/<module>/<name>')
@view('category.mako')
def module(module, name):
    helper = {"Type" : 0, "Localisation" : 1}
    helper2= {"Bureau" : 0, "Couloir" : 1, "Cuisine" : 2, "Entree": 3, "Salle": 4, "Salon": 5, "Salle_de_Bain": 6}
    devs = xaal_core.monitor.devices
    data = get_config_file()
    r = {'title': name}
    r.update({'category': module})
    r.update({'devs' : devs})
    r.update({'modules' : data['pages']['modules']})
    if module == 'Type' :
      r.update({'objects' : data['pages']['modules'][helper['Type']]['objects']})
    else :   
      r.update({'modules' : data['pages']['modules']})
      r.update({'objects' : data['pages']['modules'][helper[module]]['objects']})
      r.update({'list'    : data['pages']['modules'][helper[module]]['objects'][helper2[name]]['list']})
    return r

#################################################################
#@ GENERIC PAGES

@route('/generic/<addr>')
@view('generic.mako')
def get_device(addr):
    data = get_config_file()
    r = {'title' : 'device %s' % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({'dev' : dev})
    return r

#################################################################
#@ SCENARIOS PAGES

@route('/on_dimmer_lamp_scenario')
@view('on_dimmer_lamp_scenario.mako')
def get_devices_scenario():
  data = get_config_file()
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

@route('/off_dimmer_lamp_scenario')
@view('off_dimmer_lamp_scenario.mako')
def get_devices_scenario():
  data = get_config_file()
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

@route('/on_power_relay_scenario')
@view('on_power_relay_scenario.mako')
def get_devices_scenario():
  data = get_config_file()
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

@route('/off_power_relay_scenario')
@view('off_power_relay_scenario.mako')
def get_devices_scenario():
  data = get_config_file()
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r