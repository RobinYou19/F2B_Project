<%inherit file="base.mako"/>

<body>

<% 
	dynamic = False 
%>
%for object in objects :
	%if (object['list']['dynamic'] == 'True') and (object['type'] == 'HMIS') :
		<% dynamic = True %>
	%endif
%endfor

%if dynamic :
	%for dev in devs :
		%if 'hmi.basic' in dev.devtype :
			<div class='col-sm-3'>
				<hmi-basic address=${dev.address} title=${dev.devtype} src='/static/imgs/lampe-profile.png'></hmi-basic>
			</div>
		%endif
	%endfor
%endif

%for object in objects :
	%for static in object['list']['static'] :
		%try :
			<div class='col-sm-3'>
				<barometer-basic address=${static['address']} title=${static['title']}  value=${static['value']} src=${static['src']}></barometer-basic>
			</div>
		%except :
			<% 
				# do nothing 
			%>
		%endtry
	%endfor
%endfor

</body>