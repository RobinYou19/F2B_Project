<%inherit file="base.mako"/>

%for dev in devs :
	%if "lamp.dimmer" in dev.devtype :
		<div class='col-sm-3'>
			<onoff-device address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} src='static/imgs/lampe-profile.png'></onoff-device>
		</div>

	%elif "powerrelay.basic" in dev.devtype :
	<div class='col-sm-3'>
		<onoff-device address=${dev.address} title=${dev.devtype} status=${dev.attributes['power']} src='static/imgs/powerrelay-profile.png'></onoff-device>
	</div>
	%endif
%endfor