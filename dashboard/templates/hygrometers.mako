<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'hygrometer.basic' in dev.devtype :
		<hygrometer-basic address=${dev.address} humidity=${dev.attributes['humidity']}></hygrometer-basic>
	%endif
%endfor

</body>