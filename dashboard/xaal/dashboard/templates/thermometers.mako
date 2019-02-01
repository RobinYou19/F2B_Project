<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'thermometer.basic' in dev.devtype :
		<thermometer-basic address=${dev.address} temperature=${dev.attributes['temperature']}></thermometer-basic>
	%endif
%endfor

</body>