<%inherit file="base.mako"/>

<% lamp = devs.fetch_one_kv('nickname', lamp_entree) %>

<div class='col-sm-3'>
	%if lamp :
		<lamp-dimmer address=${lamp.address} title=${lamp_entree} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		<notfound-device name=${lamp_entree} src='static/imgs/lampe-profile.png'></notfound-device>
	%endif
</div>