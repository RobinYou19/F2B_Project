from .default import view,route,xaal_core

from bottle import request,redirect,get,post

import copy

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


@route('/generic/<addr>')
@view('generic.mako')
def get_device(addr):
    r = {"title" : "device %s" % addr}
    dev = xaal_core.get_device(addr)
    if dev:
        r.update({"dev" : dev})
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


@route('/links')
@view('links.mako')
def links():
    return {'title':'Links'}

@route('/menu')
@view('menu.mako')
def menu():
    return {"title" : "Menu"}

@route('/house')
@view('house.mako')
def get_devices_house():
    r = {"title" : "devices list"}
    devs = xaal_core.monitor.devices
    r.update({"devs" : devs})
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
    return {'title':'Favorites'}

@route('/configuration')
@view('configuration.mako')
def configuration():
    return {'title':'Configuration'}

@route('/account')
@view('account.mako')
def account():
    return {'title':'Account'}


@route('/type')
@view('type.mako')
def type():
    return {'title':'Type'}

@route('/localisation')
@view('localisation.mako')
def localisation():
    return {'title':'Localisation'}


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