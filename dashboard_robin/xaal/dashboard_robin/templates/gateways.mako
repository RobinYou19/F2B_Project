<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'gateway.basic' in dev.devtype :
		<div class='col-sm-3'>
			<gateway-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/gateway-profile.png'></gateway-basic>
		</div>
	%endif
%endfor

</body>