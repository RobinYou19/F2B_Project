<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'barometer.basic' in dev.devtype :
		<div class='col-sm-3'>
			<barometer-basic address=${dev.address} title=${dev.devtype}  value=${dev.attributes['pressure']} src="static/imgs/barometer-profile2.png"></barometer-basic>
		</div>
	%endif
%endfor

</body>