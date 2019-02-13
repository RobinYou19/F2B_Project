<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'lamp.dimmer' in dev.devtype :
		<div class='col-sm-3'>
			<lamp-dimmer address=${dev.address} title=${dev.devtype} status=${dev.attributes['light']} src='static/imgs/lampe-profile.png'></lamp-dimmer>
		</div>
	%endif
%endfor

</body>