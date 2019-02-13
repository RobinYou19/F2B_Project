<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'powerrelay.basic' in dev.devtype :
		<div class='col-sm-3'>
			<powerrelay-basic address=${dev.address} title=${dev.devtype} status=${dev.attributes['power']} src='static/imgs/powerrelay-profile.png'></powerrelay-basic>
		</div>
	%endif
%endfor

</body>