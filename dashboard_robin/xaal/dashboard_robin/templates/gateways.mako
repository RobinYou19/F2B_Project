<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'gateway.basic' in dev.devtype :
		<gateway-basic address=${dev.address}></gateway-basic>
	%endif
%endfor

</body>