<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'thermometer.basic' in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} value=${dev.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></basic-device>
		</div>
	%endif
%endfor

</body>