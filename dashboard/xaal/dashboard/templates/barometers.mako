<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'barometer.basic' in dev.devtype :
		<barometer-basic address=${dev.address} pressure=${dev.attributes['pressure']}></barometer-basic>
	%endif
%endfor

</body>