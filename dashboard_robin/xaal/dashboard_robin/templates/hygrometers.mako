<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'hygrometer.basic' in dev.devtype :
		<div class='col-sm-3'>
			<hygrometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['humidity']} src='/static/imgs/hygrometer-profile2.png'></hygrometer-basic>
	</div>	
	%endif
%endfor

</body>