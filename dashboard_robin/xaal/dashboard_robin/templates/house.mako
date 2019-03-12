<%inherit file="base.mako"/>

<style type='text/css'>

%for balise in house['css']:
	${balise} 
	{
	<% 
		dict_string = house['css'][balise]['string'] 
		dict_int    = house['css'][balise]['int']
	%>
	%for key, value in dict_string.items():
		%if key.count('background-image') :
		${key} : url("${value}") ;
		%else :
			${key} : "${value}" ;
		%endif
	%endfor
	%for key, value in dict_int.items():
		${key} : ${value} ;
	%endfor
	}
%endfor

</style>

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

%if house['dynamic'] == 'true':
	%for dev in devs :
		%if "lamp.dimmer" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<lamp-dimmer address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%elif "lamp.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<lamp-dimmer address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%elif "lamp.toggle" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<lamp-dimmer address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%elif "powerrelay.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<powerrelay-basic address=${dev.address} title=${dev.devtype} status=${dev.attributes['power']} src='static/imgs/powerrelay-profile.png'></powerrelay-basic>
				%except :
					<% 
						#DO NOTHING
						%>
				%endtry
			</div>

		%elif "shutter.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<uds-device address=${dev.address} title=${dev.devtype} src='/static/imgs/shutter-profile.png'></uds-device>
				%except :
					<% 
						#DO NOTHING
						%>
				%endtry
			</div>
		%endif
	%endfor

	%for dev in devs :
		%if "thermometer.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<thermometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%elif "barometer.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<barometer-basic address=${dev.address} title=${dev.devtype}  value=${dev.attributes['pressure']} src="static/imgs/barometer-profile2.png"></barometer-basic>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%elif "hygrometer.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<hygrometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['humidity']} src='/static/imgs/hygrometer-profile2.png'></hygrometer-basic>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>	

		%elif "windgauge.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<windgauge-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['windStrength']} src='/static/imgs/windgauge-profile.png'></windgauge-basic>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%endif
	%endfor

	%for dev in devs :
		%if "gateway.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<gateway-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/gateway-profile2.png'></gateway-basic>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>	

		%elif "hmi.basic" in dev.devtype :
			<div class='col-sm-3'>
				%try :
					<hmi-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/lampe-profile.png'></hmi-basic>
				%except :
					<% 
						#DO NOTHING
					%>
				%endtry
			</div>

		%endif
	%endfor
%endif

</body>