<%inherit file="base.mako"/>

<body>

<div class="col-sm-3">
	<div class="basic_box">
		<basic-title title='Analog Clock'></basic-title>
		<div id="watch">
		  <div id="hours"></div>
		  <div id="minutes"></div>
		</div>
		<div id="digital">Time here</div>
	</div>
</div>

%for couple in double_lamps :
	<% 
		first_lamp = devs.fetch_one_kv('nickname', couple[0])
		second_lamp = devs.fetch_one_kv('nickname',couple[1])
	%>
	<div class='col-sm-3'>
	%if first_lamp :
		<lamp-dimmer address=${first_lamp.address} title=${couple[0]} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		<notfound-device name=${couple[0]} src='static/imgs/lampe-profile.png'></notfound-device>
	<hr>
	%endif
	%if second_lamp :
		<lamp-dimmer address=${second_lamp.address} title=${couple[0]} status=${second_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		<notfound-device name=${couple[1]} src='static/imgs/lampe-profile.png'></notfound-device>	
	%endif
	</div>
%endfor

<% 
	power_relay = devs.fetch_one_kv('device', wall_plug[0])
	power_meter = devs.fetch_one_kv('device', wall_plug[1])
%>
<div class='col-sm-3'>
	%if power_relay :
		<powerrelay-basic address=${power_relay.address} title='Wall Plug PowerRelay' status=${power_relay.attributes['power']} src='static/imgs/powerrelay-profile.png'></powerrelay-basic>
	%else :
		<notfound-device name='Wall Plug PowerRelay' src='static/imgs/powerrelay-profile.png'></notfound-device>	
	%endif
	<hr>
	%if power_meter :
		<powermeter-basic address=${power_meter.address} title='Wall Plug PowerMeter' value=${power_meter.attributes['power']} src='/static/imgs/powermeter-profile.png'></powermeter-basic>
	%else :
		<notfound-device name='Wall Plug PowerMeter' src='static/imgs/powermeter-profile.png'></notfound-device>
	%endif
</div>

<% 
	first_thermometer  = devs.fetch_one_kv('nickname', double_thermometers[0][0])
	second_thermometer = devs.fetch_one_kv('nickname', double_thermometers[0][1])
%>
<div class='col-sm-3'>
%if first_thermometer :
	<thermometer-basic address=${first_thermometer.address} title=${double_thermometers[0][0]} value=${first_thermometer.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
	%else :
		<notfound-device name=${double_thermometers[0][1]} src='static/imgs/thermometer-profile.png'></notfound-device>
%endif
<hr>
%if second_thermometer :
	<thermometer-basic address=${second_thermometer.address} title=${double_thermometers[0][1]} value=${second_thermometer.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
%else :
	<notfound-device name=${double_thermometers[0][1]} src='static/imgs/thermometer-profile.png'></notfound-device>
%endif
</div>

<% 
	first_hygrometer  = devs.fetch_one_kv('nickname', double_hygrometers[0][0])
	second_hygrometer = devs.fetch_one_kv('nickname', double_hygrometers[0][1])
%>
<div class='col-sm-3'>
	%if first_hygrometer :
		<hygrometer-basic address=${first_hygrometer.address} title=${double_hygrometers[0][0]} value=${first.attributes['windStrength']} src='static/imgs/hygrometer-profile.png' width='50'></hygrometer-basic>
		<hr>
	%else :
		<notfound-device name=${double_hygrometers[0][1]} src='static/imgs/hygrometer-profile.png'></notfound-device>
	%endif
	<hr>
	%if second_hygrometer :
		<hygrometer-basic address=${second_hygrometer.address} title=${double_hygrometers[0][1]} value=${second.attributes['windStrength']} src='static/imgs/hygrometer-profile.png' width='50'></hygrometer-basic>
	%else :
		<notfound-device name=${double_hygrometers[0][1]} src='static/imgs/hygrometer-profile.png'></notfound-device>
	%endif
</div>


<div class='col-sm-3'>
	<%
	size = len(shutters)
	i = 0
	%>
	%for shutter in shutters :
		<% 
		i += 1 
		detected_shutter = devs.fetch_one_kv('device', shutter[1]) 
		%>
		%if detected_shutter :
			<uds-device address=${shutter[1]} title=${shutter[0]} src='/static/imgs/shutter-profile.png'></uds-device>
		%else :
			<notfound-device name=${shutter[0]} src='static/imgs/shutter-profile.png'></notfound-device>
		%endif
		%if i != size :
			<hr>
		%endif
	%endfor
</div>

%for dev in devs :
	%if "lamp.dimmer" in dev.devtype :
		<div class='col-sm-3'>
			<lamp-dimmer address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} src='static/imgs/lampe-profile.png';></lamp-dimmer>
		</div>

	%elif "powerrelay.basic" in dev.devtype :
	<div class='col-sm-3'>
		<powerrelay-basic address=${dev.address} title=${dev.devtype} status=${dev.attributes['power']} src='static/imgs/powerrelay-profile.png'></powerrelay-basic>
	</div>
	%endif
%endfor

%for dev in devs :
	%if "thermometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<thermometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
		</div>

	%elif "barometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<barometer-basic address=${dev.address} title=${dev.devtype}  value=${dev.attributes['pressure']} src="static/imgs/barometer-profile.png"></barometer-basic>
		</div>

	%elif "hygrometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<hygrometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['humidity']} src='/static/imgs/hygrometer-profile.png'></hygrometer-basic>
		</div>	

	%elif "windgauge.basic" in dev.devtype :
		<div class='col-sm-3'>
			<windgauge-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['windStrength']} src='/static/imgs/windgauge-profile.png'></windgauge-basic>
		</div>

	%endif
%endfor

%for dev in devs :
	%if "gateway.basic" in dev.devtype :
		<div class='col-sm-3'>
			<gateway-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/gateway-profile.png'></gateway-basic>
		</div>	

	%elif "hmi.basic" in dev.devtype :
		<div class='col-sm-3'>
			<hmi-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/hmi.png'></hmi-basic>
		</div>

	%endif
%endfor

</body>