from .default import view,route,xaal_core

from bottle import request,redirect,get,post

import copy, json, os

#GLOBAL VARIABLES

double_lamps        = [('lamp_entree' , 'lamp_couloir'), 
                       ('lamp_salon'  , 'lamp_salle'),
                       ('lamp_cuisine', 'lamp_sdb')]

shutters            = [('Volet_Cuisine','2fe70f46-3ece-44d1-af34-2d82e10fb854'), 
                       ('Volet_SDB'    ,'e4b05165-be5d-46d5-acd0-4da7be1158ed')]

double_thermometers = [('temp_owm', 'temp_bureau')]
double_hygrometers  = [('rh_owm'  , 'rh_bureau'  )]

wall_plug           = ["5e50a1ed-5290-4cdb-b00f-1f968eee4401",
                       "5e50a1ed-5290-4cdb-b00f-1f968eee4402"]

#################################################################
#@ MENU PAGES

@route('/menu')
@view('menu.mako')
def menu():
    return {'title' : 'Menu'}

@route('/house')
@view('house.mako')
def get_devices_house():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    r.update({"double_lamps" : double_lamps})
    r.update({"shutters" : shutters})
    r.update({"double_thermometers" : double_thermometers})
    r.update({"double_hygrometers" : double_hygrometers})
    r.update({"wall_plug" : wall_plug})
    return r

@route('/modules')
@view('modules.mako')
def modules():
    return {'title':'Modules'}

@route('/scenarios')
@view('scenarios.mako')
def scenarios():
    return {'title':'Scenarios'}

@route('/favorites')
@view('favorites.mako')
def favorites():
    r = {'title':'Favorites'}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/configuration')
@view('configuration.mako')
def configuration():
    return {'title':'Configuration'}

@route('/account')
@view('account.mako')
def account():
    return {'title':'Account'}


#################################################################
#@ MODULE PAGES

@route('/type')
@view('type.mako')
def type():
    return {'title':'Type'}

@route('/localisation')
@view('localisation.mako')
def localisation():
    return {'title':'Localisation'}


#################################################################
#@ TYPE PAGES

@route('/barometers')
@view('barometers.mako')
def get_devices_barometers():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/gateways')
@view('gateways.mako')
def get_devices_gateways():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/hmis')
@view('hmis.mako')
def get_devices_hmis():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/hygrometers')
@view('hygrometers.mako')
def get_devices_hygrometers():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/lights')
@view('lights.mako')
def get_devices_lights():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/power_relays')
@view('power_relays.mako')
def get_devices_power_relays():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/thermometers')
@view('thermometers.mako')
def get_devices_thermometers():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@route('/windgauges')
@view('windgauges.mako')
def get_devices_windgauges():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

#################################################################
#@ GENERIC PAGES


@route('/generic/<addr>')
@view('generic.mako')
def get_device(addr):
    r = {"title" : "device %s" % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({"dev" : dev})
    return r


#################################################################
#@ LOCALISATION PAGES

@route('/bureau')
@view('bureau.mako')
def get_devices_bureau():
  r = {"title" : "devices bureau list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"thermometer_bureau" : double_thermometers[0][1]})
  r.update({"hygrometer_bureau" : double_hygrometers[0][1]})
  return r

@route('/couloir')
@view('couloir.mako')
def get_devices_couloir():
  r = {"title" : "devices couloir list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"lamp_couloir" : double_lamps[0][1]})
  return r

@route('/cuisine')
@view('cuisine.mako')
def get_devices_cuisine():
  r = {"title" : "devices cuisine list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"lamp_cuisine" : double_lamps[2][0]})
  r.update({"shutter_cuisine" : shutters[0]})
  return r

@route('/entree')
@view('entree.mako')
def get_devices_entree():
  r = {"title" : "devices entree list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"lamp_entree" : double_lamps[0][0]})
  return r

@route('/salle')
@view('salle.mako')
def get_devices_salle():
  r = {"title" : "devices salle list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"lamp_salle" : double_lamps[1][1]})
  return r

@route('/salon')
@view('salon.mako')
def get_devices_salon():
  r = {"title" : "devices salon list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"lamp_salon" : double_lamps[1][0]})
  return r

@route('/sdb')
@view('sdb.mako')
def get_devices_sdb():
  r = {"title" : "devices salle de bain list"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  r.update({"lamp_sdb" : double_lamps[2][1]})
  r.update({"shutter_sdb" : shutters[1]})
  return r


#################################################################
#@ SCENARIOS PAGES

@route('/on_dimmer_lamp_scenario')
@view('on_dimmer_lamp_scenario.mako')
def get_devices_scenario():
  r = {"title" : "devices scenario"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
  return r

@route('/off_dimmer_lamp_scenario')
@view('off_dimmer_lamp_scenario.mako')
def get_devices_scenario():
  r = {"title" : "devices scenario"}
  devs = xaal_core.monitor.devices
  r.update({"devs" : devs})
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
    r = {"title" : "Network stats"}
    r.update({"total"   :total})
    r.update({"devtypes":results})
    r.update({"uptime"  : xaal_core.get_uptime()})
    return r


@route('/bottle_info')
@view('bottle_info.mako')
def info():
    r = {"title" : "Bottle Server Info"}
    r.update({"headers" : request.headers})
    r.update({"query"   : request.query})
    r.update({"environ" : copy.copy(request.environ)})
    return r


@route('/devices')
@view('devices.mako')
def get_device():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
    return r

@get('/edit_metadata/<addr>')
@view('edit_metadata.mako')
def edit_metadata(addr):
    r = {"title" : "device %s" % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({"dev" : dev})
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
    

@route('/grid')
@view('grid.mako')
def test_grid():
    return {"title" : "Grid","devices":xaal_core.monitor.devices}


@route('/latency')
def socketio_latency_test():
    redirect('/static/latency.html')