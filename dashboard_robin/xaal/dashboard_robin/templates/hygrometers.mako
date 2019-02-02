<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'hygrometer.basic' in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} value=${dev.attributes['humidity']} src='/static/imgs/hygrometer-profile.png'></basic-device>
	</div>	
	%endif
%endfor

</body>