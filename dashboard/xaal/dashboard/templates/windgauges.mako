<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'windgauge.basic' in dev.devtype :
		<windgauge-basic address=${dev.address} strength=${dev.attributes['windStrength']} angle=${dev.attributes['windAngle']} ></windgauge-basic>
	%endif
%endfor

</body>