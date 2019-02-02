<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'hmi.basic' in dev.devtype :
		<div class='col-sm-3'>
			<basic-device address=${dev.address} title=${dev.devtype} src='/static/imgs/hmi-profile.png'></basic-device>
		</div>
	%endif
%endfor

</body>