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
				<lamp-dimmer address=${dev.address} status=${dev.attributes['light']}></lamp-dimmer>
		</div>

	%elif "thermometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<thermometer-basic address=${dev.address} temperature=${dev.attributes['temperature']}></thermometer-basic>
		</div>

	%elif "barometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<barometer-basic address=${dev.address} pressure=${dev.attributes['pressure']}></barometer-basic>
		</div>

	%elif "hygrometer.basic" in dev.devtype :
		<div class='col-sm-3'>
			<hygrometer-basic address=${dev.address} humidity=${dev.attributes['humidity']}></hygrometer-basic>
	</div>	

	%elif "windgauge.basic" in dev.devtype :
		<div class='col-sm-3'>
			<windgauge-basic address=${dev.address} strength=${dev.attributes['windStrength']} angle=${dev.attributes['windAngle']} ></windgauge-basic>
		</div>

	%elif "gateway.basic" in dev.devtype :
		<div class='col-sm-3'>
			<gateway-basic address=${dev.address}></gateway-basic>
	</div>	

	%elif "hmi.basic" in dev.devtype :
	<div class='col-sm-3'>
		<hmi-basic address=${dev.address}></hmi-basic>
	</div>

	%elif "powerrelay.basic" in dev.devtype :
	<div class='col-sm-3'>
		<powerrelay-basic address=${dev.address} power=${dev.attributes['power']}></powerrelay-basic>
	</div>

	%endif
%endfor

</body>