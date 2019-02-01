<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'hmi.basic' in dev.devtype :
		<hmi-basic address=${dev.address}></hmi-basic>
	%endif
%endfor

</body>