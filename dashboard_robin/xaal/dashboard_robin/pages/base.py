from .default import view,route,xaal_core

from bottle import request,redirect,get,post, static_file

import copy, json, os

#GLOBAL VARIABLES
this_directory = os.path.dirname(os.path.abspath(__file__))
filename = '/../../../config.json'
config_path = this_directory + filename

with open(config_path) as f:
  data = json.load(f)

#################################################################
#@ MENU PAGES

@route('/menu')
@view('menu.mako')
def menu():
    r =  {'title' : 'menu'}
    r.update({'menu' : data['pages']['menu']})
    return r

@route('/house')
@view('house.mako')
def get_devices_house():
    r = {'title' : 'House'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'house' : data['pages']['house']})
    return r

@route('/modules')
@view('modules.mako')
def modules():
    r = {'title':'Modules'}
    r.update({'modules' : data['pages']['modules']})
    return r

@route('/scenarios')
@view('scenarios.mako')
def scenarios():
    r = {'title':'Scenarios'}
    r.update({'scenarios' : data['pages']['scenarios']})
    return r

@route('/favorites')
@view('favorites.mako')
def favorites():
    r = {'title':'Favorites'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'favorites' : data['pages']['favorites']})
    return r

@route('/configuration')
@view('configuration.mako')
def configuration():
    r = {'title' : 'Configuration'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'configuration' : data['pages']['configuration']})
    return r

@route('/config_file')
@view('configuration_file.mako')
def configuration():
    r = {'title' : 'Configuration File'}
    r.update({'data' : data})
    return r

@route('/config_device')
@view('configuration_device.mako')
def configuration():
    r = {'title' : 'Configuration Device'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    return r

@get('/edit_metadata/<addr>')
@view('edit_metadata.mako')
def edit_metadata(addr):
    r = {'title' : 'device %s' % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({'dev' : dev})
    return r


@post('/edit_metadata/<addr>')
@view('edit_metadata.mako')
def save_metadata(addr):
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
    r = {'title' : 'Account'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    return r


#################################################################
#@ MODULE PAGES

@route('/type')
@view('type.mako')
def type():
    r =  {'title':'Type'}
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/localisation')
@view('localisation.mako')
def localisation():
    r = {'title':'Localisation'}
    r.update({'objects' : data['pages']['modules'][1]['objects']})
    return r


#################################################################
#@ TYPE PAGES

@route('/barometers')
@view('barometers.mako')
def get_devices_barometers():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/gateways')
@view('gateways.mako')
def get_devices_gateways():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/hmis')
@view('hmis.mako')
def get_devices_hmis():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/hygrometers')
@view('hygrometers.mako')
def get_devices_hygrometers():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/lights')
@view('lights.mako')
def get_devices_lights():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/power_relays')
@view('power_relays.mako')
def get_devices_power_relays():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/thermometers')
@view('thermometers.mako')
def get_devices_thermometers():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

@route('/windgauges')
@view('windgauges.mako')
def get_devices_windgauges():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    r.update({'objects' : data['pages']['modules'][0]['objects']})
    return r

#################################################################
#@ GENERIC PAGES


@route('/generic/<addr>')
@view('generic.mako')
def get_device(addr):
    r = {'title' : 'device %s' % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({'dev' : dev})
    return r


#################################################################
#@ LOCALISATION PAGES

@route('/bureau')
@view('bureau.mako')
def get_devices_bureau():
  r = {'title' : 'devices bureau list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][0]['list']})
  return r

@route('/couloir')
@view('couloir.mako')
def get_devices_couloir():
  r = {'title' : 'devices couloir list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][1]['list']})
  return r

@route('/cuisine')
@view('cuisine.mako')
def get_devices_cuisine():
  r = {'title' : 'devices cuisine list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][2]['list']})
  return r

@route('/entree')
@view('entree.mako')
def get_devices_entree():
  r = {'title' : 'devices entree list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][3]['list']})
  return r

@route('/salle')
@view('salle.mako')
def get_devices_salle():
  r = {'title' : 'devices salle list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][4]['list']})
  return r

@route('/salon')
@view('salon.mako')
def get_devices_salon():
  r = {'title' : 'devices salon list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][5]['list']})
  return r

@route('/sdb')
@view('sdb.mako')
def get_devices_sdb():
  r = {'title' : 'devices salle de bain list'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  r.update({'list' : data['pages']['modules'][1]['objects'][6]['list']})
  return r


#################################################################
#@ SCENARIOS PAGES

@route('/on_dimmer_lamp_scenario')
@view('on_dimmer_lamp_scenario.mako')
def get_devices_scenario():
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

@route('/off_dimmer_lamp_scenario')
@view('off_dimmer_lamp_scenario.mako')
def get_devices_scenario():
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

@route('/on_power_relay_scenario')
@view('on_power_relay_scenario.mako')
def get_devices_scenario():
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

@route('/off_power_relay_scenario')
@view('off_power_relay_scenario.mako')
def get_devices_scenario():
  r = {'title' : 'devices scenario'}
  devs = xaal_core.monitor.devices
  r.update({'devs' : devs})
  return r

#################################################################
#@ OLD PAGES

@route('/stats')
@view('stats.mako')
def stats():
    total = 0
    results = {}
    for dev in xaal_core.monitor.devices:
        total = total + 1
        try:
            k = dev.devtype
            results[k]=results[k]+1
        except KeyError:
            results.update({k:1})
    r = {'title' : 'Network stats'}
    r.update({'total'   :total})
    r.update({'devtypes':results})
    r.update({'uptime'  : xaal_core.get_uptime()})
    return r


@route('/bottle_info')
@view('bottle_info.mako')
def info():
    r = {'title' : 'Bottle Server Info'}
    r.update({'headers' : request.headers})
    r.update({'query'   : request.query})
    r.update({'environ' : copy.copy(request.environ)})
    return r


@route('/devices')
@view('devices.mako')
def get_device():
    r = {'title' : 'devices list'}
    devs = xaal_core.monitor.devices
    r.update({'devs' : devs})
    return r

@route('/grid')
@view('grid.mako')
def test_grid():
    return {'title' : 'Grid','devices':xaal_core.monitor.devices}


@route('/latency')
def socketio_latency_test():
    redirect('/static/latency.html')