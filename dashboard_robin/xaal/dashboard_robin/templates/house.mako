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

%for dev in devs :
	%if "lamp.dimmer" in dev.devtype :
		<div class='col-sm-3'>
				<lamp-dimmer address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} ></lamp-dimmer>
		</div>

	%elif "thermometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<thermometer-basic address=${dev.address} title=${dev.devtype} temperature=${dev.attributes['temperature']}></thermometer-basic>
		</div>

	%elif "barometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<barometer-basic address=${dev.address} title=${dev.devtype}  pressure=${dev.attributes['pressure']}></barometer-basic>
		</div>

	%elif "hygrometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<hygrometer-basic address=${dev.address} title=${dev.devtype} humidity=${dev.attributes['humidity']}></hygrometer-basic>
	</div>	

	%elif "windgauge.basic" in dev.devtype :
		<div class='col-sm-3'>
			<windgauge-basic address=${dev.address} title=${dev.devtype} strength=${dev.attributes['windStrength']} angle=${dev.attributes['windAngle']} ></windgauge-basic>
		</div>

	%elif "gateway.basic" in dev.devtype :
		<div class='col-sm-3'>
			<gateway-basic address=${dev.address} title=${dev.devtype}></gateway-basic>
	</div>	

	%elif "hmi.basic" in dev.devtype :
	<div class='col-sm-3'>
		<hmi-basic address=${dev.address} title=${dev.devtype}></hmi-basic>
	</div>

	%elif "powerrelay.basic" in dev.devtype :
	<div class='col-sm-3'>
		<powerrelay-basic address=${dev.address} title=${dev.devtype} power=${dev.attributes['power']}></powerrelay-basic>
	</div>

	%endif
%endfor

</body>