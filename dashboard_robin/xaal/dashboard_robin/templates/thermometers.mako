<%inherit file="base.mako"/>

<body>

<% 
	dynamic = False 
%>
%for object in objects :
	%if (object['list']['dynamic'] == 'True') and (object['type'] == 'Gateways') :
		<% dynamic = True %>
	%endif
%endfor

%if dynamic :
	%for dev in devs :
		%if 'thermometer.basic' in dev.devtype :
			<div class='col-sm-3'>
				<thermometer-basic address=${dev.address} title=${dev.devtype} value=${dev.attributes['temperature']} src='static/imgs/thermometer-profile.png' width='50'></thermometer-basic>
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