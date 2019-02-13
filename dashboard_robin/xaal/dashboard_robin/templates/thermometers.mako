<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'thermometer.basic' in dev.devtype :
		<div class='col-sm-3'>
			<thermometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
		</div>
	%endif
%endfor

</body>