<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'windgauge.basic' in dev.devtype :
		<div class='col-sm-3'>
			<windgauge-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['windStrength']} src='/static/imgs/windgauge-profile.png'></windgauge-basic>
		</div>
	%endif
%endfor

</body>