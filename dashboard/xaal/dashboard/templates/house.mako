<%inherit file="base.mako"/>

<body>

<div class="col-sm-3">
	<div class="draggable">
		<div id="watch">
		  <div id="hours"></div>
		  <div id="minutes"></div>
		</div>
		<div id="digital">Time here</div>
	</div>
</div>

%for dev in devs :
	%if "lamp.dimmer" in dev.devtype :
		<lamp-dimmer address=${dev.address} status=${dev.attributes['light']}></lamp-dimmer>

	%elif "thermometer.basic" in dev.devtype :
		<thermometer-basic address=${dev.address} temperature=${dev.attributes['temperature']}></thermometer-basic>

	%elif "barometer.basic" in dev.devtype :
		<barometer-basic address=${dev.address} pressure=${dev.attributes['pressure']}></barometer-basic>

	%elif "hygrometer.basic" in dev.devtype :
		<hygrometer-basic address=${dev.address} humidity=${dev.attributes['humidity']}></hygrometer-basic>

	%elif "windgauge.basic" in dev.devtype :
		<windgauge-basic address=${dev.address} strength=${dev.attributes['windStrength']} angle=${dev.attributes['windAngle']} ></windgauge-basic>

	%elif "gateway.basic" in dev.devtype :
		<gateway-basic address=${dev.address}></gateway-basic>

	%elif "hmi.basic" in dev.devtype :
		<hmi-basic address=${dev.address}></hmi-basic>

	%elif "powerrelay.basic" in dev.devtype :
		<powerrelay-basic address=${dev.address} power=${dev.attributes['power']}></powerrelay-basic>

	%endif
%endfor

</body>