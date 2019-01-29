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
	%if "lamp" in dev.devtype :
		<lamp-basic address=${dev.address} status=${dev.attributes['light']}></lamp-basic>

	%elif "thermometer" in dev.devtype :
		<thermometer-basic address=${dev.address} temperature=${dev.attributes['temperature']}></thermometer-basic>

	%elif "barometer" in dev.devtype :
		<barometer-basic address=${dev.address} pressure=${dev.attributes['pressure']}></barometer-basic>

	%elif "hygrometer" in dev.devtype :
		<hygrometer-basic address=${dev.address} humidity=${dev.attributes['humidity']}></hygrometer-basic>

	%elif "windgauge" in dev.devtype :
		<windgauge-basic address=${dev.address} strength=${dev.attributes['windStrength']} angle=${dev.attributes['windAngle']} ></windgauge-basic>

	%elif "gateway" in dev.devtype :
		<gateway-basic address=${dev.address}></gateway-basic>

	%elif "hmi" in dev.devtype :
		<hmi-basic address=${dev.address}></hmi-basic>

	%endif
%endfor

</body>