<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'powerrelay.basic' in dev.devtype :
		<powerrelay-basic address=${dev.address} power=${dev.attributes['power']}></powerrelay-basic>
	%endif
%endfor

</body>