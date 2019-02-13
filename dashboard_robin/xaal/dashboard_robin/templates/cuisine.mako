<%inherit file="base.mako"/>

<% lamp = devs.fetch_one_kv('nickname', lamp_cuisine) %>

<div class='col-sm-3'>
	%if lamp :
		<lamp-dimmer address=${lamp.address} title=${lamp_cuisine} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		<notfound-device name=${lamp_cuisine} src='static/imgs/lampe-profile.png'></notfound-device>
	%endif
</div>

<% shutter = devs.fetch_one_kv('device', shutter_cuisine[1]) %>

<div class='col-sm-3'>
	%if shutter :
		<uds-device address=${shutter_cuisine[1]} title=${shutter_cuisine[0]} src='/static/imgs/shutter-profile.png'></uds-device>
	%else :
		<notfound-device name=${shutter_cuisine[0]} src='static/imgs/shutter-profile.png'></notfound-device>
	%endif
</div>
