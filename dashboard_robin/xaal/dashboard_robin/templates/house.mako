<%inherit file="base.mako"/>

<body>

%if house['static']['display_clock'] == "true":
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
%endif

%for couple in house['static']['devices']['couples']['lamps'] :
	<% 
		first_lamp = devs.fetch_one_kv('nickname', couple[0]['name'])
		second_lamp = devs.fetch_one_kv('nickname',couple[1]['name'])
	%>
	<div class='col-sm-3'>
	%if first_lamp :
		<lamp-dimmer address=${first_lamp.address} title=${couple[0]['name']} status=${first_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		%try :
			<%couple[0]['address']%>
			<lamp-dimmer address=${couple[0]['address']} src='static/imgs/lampe-profile.png'}></lamp-dimmer>
		%except :
			<notfound-device name=${couple[0]['name']} src='static/imgs/lampe-profile.png'></notfound-device>
		%endtry
	<hr>
	%endif
	%if second_lamp :
		<lamp-dimmer address=${second_lamp.address} title=${couple[0]['name']} status=${second_lamp.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
	%else :
		%try :
			<%couple[1]['address']%>
			<lamp-dimmer address=${couple[1]['address']} src='static/imgs/lampe-profile.png'}></lamp-dimmer>	
		%except :
			<notfound-device name=${couple[1]['name']} src='static/imgs/lampe-profile.png'></notfound-device>	
		%endtry
	%endif
	</div>
%endfor

%for couple in house['static']['devices']['couples']['thermometers'] :
	<% 
		first_thermometer  = devs.fetch_one_kv('nickname', couple[0]['name'])
		second_thermometer = devs.fetch_one_kv('nickname', couple[0]['name'])
	%>
	<div class='col-sm-3'>
	%if first_thermometer :
		<thermometer-basic address=${first_thermometer.address} title=${couple[0]['name']} value=${first_thermometer.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
	%else :
		%try :
			<% couple[0]['address'] %>
			<thermometer-basic address=${couple[0]['address']} src='static/imgs/thermometer-profile.png'></thermometer-basic>
		%except :
			<notfound-device name=${couple[0]['name']} src='static/imgs/thermometer-profile.png'></notfound-device>
		%endtry
	%endif
	<hr>
	%if second_thermometer :
		<thermometer-basic address=${second_thermometer.address} title=${couple[0]['name']} value=${second_thermometer.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
	%else :
		%try :
			<% couple[1]['address'] %>
			<thermometer-basic address=${couple[0]['address']} src='static/imgs/thermometer-profile.png'></thermometer-basic>
		%except :
			<notfound-device name=${couple[1]['name']} src='static/imgs/thermometer-profile.png'></notfound-device>
		%endtry
	%endif
	</div>
%endfor

%for couple in house['static']['devices']['couples']['hygrometers'] :
	<% 
		first_hygrometer  = devs.fetch_one_kv('nickname', couple[0]['name'])
		second_hygrometer = devs.fetch_one_kv('nickname', couple[0]['name'])
	%>
	<div class='col-sm-3'>
	%if first_hygrometer :
		<hygrometer-basic address=${first_hygrometer.address} title=${couple[0]['name']} value=${first_hygrometer.attributes['temperature']} src='static/imgs/hygrometer-profile2.png' width='50'></hygrometer-basic>
	%else :
		%try :
			<% couple[0]['address'] %>
			<hygrometer-basic address=${couple[0]['address']} src='static/imgs/hygrometer-profile2.png'></hygrometer-basic>
		%except :
			<notfound-device name=${couple[0]['name']} src='static/imgs/hygrometer-profile2.png'></notfound-device>
		%endtry
	%endif
	<hr>
	%if second_hygrometer :
		<hygrometer-basic address=${second_hygrometer.address} title=${couple[0]['name']} value=${second_hygrometer.attributes['temperature']} src='static/imgs/hygrometer-profile2.png' width='50'></hygrometer-basic>
	%else :
		%try :
			<% couple[1]['address'] %>
			<hygrometer-basic address=${couple[0]['address']} src='static/imgs/hygrometer-profile2.png'></hygrometer-basic>
		%except :
			<notfound-device name=${couple[1]['name']} src='static/imgs/hygrometer-profile2.png'></notfound-device>
		%endtry
	%endif
	</div>
%endfor

<div class='col-sm-3'>
	<%
	shutters = house['static']['devices']['couples']['shutters']
	size = len(shutters)
	i = 0
	%>
	%for shutter in shutters :
		<% 
		i += 1 
		detected_shutter = devs.fetch_one_kv('device', shutter['name']) 
		%>
		%if detected_shutter :
			<uds-device address=${shutter['address']} title=${shutter['name']} src='/static/imgs/shutter-profile.png'></uds-device>
		%else :
			<notfound-device name=${shutter['name']} src='static/imgs/shutter-profile.png'></notfound-device>
		%endif
		%if i != size :
			<hr>
		%endif
	%endfor
</div>

<% 
	power_relay = devs.fetch_one_kv('device', house['static']['devices']['singles']['power_relays'][0]['address'])
	power_meter = devs.fetch_one_kv('device', house['static']['devices']['singles']['power_meters'][0]['address'])
%>
<div class='col-sm-3'>
	%if power_relay :
		<powerrelay-basic address=${power_relay.address} title=${house['static']['devices']['singles']['power_relays'][0]['name']} status=${power_relay.attributes['power']} src='static/imgs/powerrelay-profile.png'></powerrelay-basic>
	%else :
		<notfound-device name=${house['static']['devices']['singles']['power_relays'][0]['name']} src='static/imgs/powerrelay-profile.png'></notfound-device>	
	%endif
	<hr>
	%if power_meter :
		<powermeter-basic address=${power_meter.address} title=${house['static']['devices']['singles']['power_meters'][0]['name']} value=${power_meter.attributes['power']} src='/static/imgs/powermeter-profile.png'></powermeter-basic>
	%else :
		<notfound-device name=${house['static']['devices']['singles']['power_meters'][0]['name']} src='static/imgs/powermeter-profile.png'></notfound-device>
	%endif
</div>

%if house['dynamic'] == 'true':
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
				<barometer-basic address=${dev.address} title=${dev.devtype}  value=${dev.attributes['pressure']} src="static/imgs/barometer-profile2.png"></barometer-basic>
			</div>

		%elif "hygrometer.basic" in dev.devtype :
			<div class='col-sm-3'>
				<hygrometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['humidity']} src='/static/imgs/hygrometer-profile2.png'></hygrometer-basic>
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
				<gateway-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/gateway-profile2.png'></gateway-basic>
			</div>	

		%elif "hmi.basic" in dev.devtype :
			<div class='col-sm-3'>
				<hmi-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/lampe-profile.png'></hmi-basic>
			</div>

		%endif
	%endfor
%endif

</body>