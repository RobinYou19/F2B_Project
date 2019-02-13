<%inherit file="base.mako"/>

<% lamp = devs.fetch_one_kv('nickname', lamp_sdb) %>

<div class='col-sm-3'>
	%if lamp :
		<lamp-dimmer address=${lamp.address} title=${lamp_sdb} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		<notfound-device name=${lamp_sdb} src='static/imgs/lampe-profile.png'></notfound-device>
	%endif
</div>

<% shutter = devs.fetch_one_kv('device', shutter_sdb[1]) %>

<div class='col-sm-3'>
	%if shutter :
		<uds-device address=${shutter_sdb[1]} title=${shutter_sdb[0]} src='/static/imgs/shutter-profile.png'></uds-device>
	%else :
		<notfound-device name=${shutter_sdb[0]} src='static/imgs/shutter-profile.png'></notfound-device>
	%endif
</div>