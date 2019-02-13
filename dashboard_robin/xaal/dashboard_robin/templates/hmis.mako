<%inherit file="base.mako"/>

<body>

%for dev in devs :
	%if 'hmi.basic' in dev.devtype :
		<div class='col-sm-3'>
			<hmi-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/hmi.png'></hmi-basic>
		</div>
	%endif
%endfor

</body>