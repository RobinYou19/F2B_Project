<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'lamp.dimmer' in dev.devtype :
		<lamp-dimmer address=${dev.address} status=${dev.attributes['light']}></lamp-dimmer>
	%endif
%endfor

</body>