<%inherit file="base.mako"/>

<% lamp = devs.fetch_one_kv('nickname', lamp_salon) %>

<div class='col-sm-3'>
	%if lamp :
		<onoff-device address=${lamp.address} title=${lamp_salon} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></onoff-device>
	%else :
		<notfound-device name=${lamp_salon} src='static/imgs/lampe-profile.png'></notfound-device>
	%endif
</div>