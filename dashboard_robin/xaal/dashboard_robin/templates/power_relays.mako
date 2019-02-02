<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'powerrelay.basic' in dev.devtype :
		<div class='col-sm-3'>
			<onoff-device address=${dev.address} title=${dev.devtype} status=${dev.attributes['power']} src='static/imgs/powerrelay-profile.png'></onoff-device>
		</div>
	%endif
%endfor

</body>