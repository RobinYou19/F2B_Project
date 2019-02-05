<%inherit file="base.mako"/>

<% thermometer = devs.fetch_one_kv('nickname',thermometer_bureau) %>
<div class='col-sm-3'>
	%if thermometer :
		<basic-device address=${thermometer.address} title=${thermometer_bureau} value=${thermometer.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></basic-device>
	%else :
		<notfound-device name=${thermometer_bureau} src='static/imgs/thermometer-profile.png'></notfound-device>
	%endif
</div>

<% hygrometer = devs.fetch_one_kv('nickname',hygrometer_bureau) %>
<div class='col-sm-3'>
	%if hygrometer :
		<basic-device address=${hygrometer.address} title=${hygrometer_bureau} value=${hygrometer.attributes['windStength']} src='static/imgs/hygromometer-profile.png' width='50'></basic-device>
	%else :
		<notfound-device name=${hygrometer_bureau} src='static/imgs/hygrometer-profile.png'></notfound-device>
	%endif
</div>