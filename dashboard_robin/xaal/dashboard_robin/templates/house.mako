<%inherit file="base.mako"/>

<body>

<div class="col-sm-3">
	<div class="box">
		<div id="watch">
		  <div id="hours"></div>
		  <div id="minutes"></div>
		</div>
		<div id="digital">Time here</div>
	</div>
</div>

%for couple in double_lamps :
	<% first_lamp = devs.fetch_one_kv('nickname',couple[0]) %>
	<% second_lamp = devs.fetch_one_kv('nickname',couple[1]) %>
	<div class='col-sm-3'>
	%if first_lamp :
		<onoff-device address=${first_lamp.address} title=${couple[0]} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></onoff-device>
		<hr>
		%if second_lamp :
			<onoff-device address=${second_lamp.address} title=${couple[0]} status=${second_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></onoff-device>
		%else :
			<notfound-device name=${couple[1]} src='static/imgs/lampe-profile.png'></notfound-device>
		%endif
	%else :
		<notfound-device name=${couple[0]} src='static/imgs/lampe-profile.png'></notfound-device>
		<hr>
		%if second_lamp :
			<onoff-device address=${second_lamp.address} title=${couple[0]} status=${second_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></onoff-device>
		%else :
			<notfound-device name=${couple[1]} src='static/imgs/lampe-profile.png'></notfound-device>	
		% endif
	%endif
	</div>
%endfor

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

%for dev in devs :
	%if "thermometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} value=${dev.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></basic-device>
		</div>

	%elif "barometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype}  value=${dev.attributes['pressure']} src="static/imgs/barometer-profile.png"></barometer-basic>
		</div>

	%elif "hygrometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} value=${dev.attributes['humidity']} src='/static/imgs/hygrometer-profile.png'></basic-device>
		</div>	

	%elif "windgauge.basic" in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} value=${dev.attributes['windStrength']} src='/static/imgs/windgauge-profile.png'></basic-device>
		</div>

	%endif
%endfor

%for dev in devs :
	%if "gateway.basic" in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} src='/static/imgs/gateway-profile.png'></basic-device>
		</div>	

	%elif "hmi.basic" in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} src='/static/imgs/hmi.png'></basic-device>
		</div>

	%endif
%endfor

<div class='col-sm-3'>
	<uds-device src='/static/imgs/shutter-profile.png'></uds-device>
</div>

</body>