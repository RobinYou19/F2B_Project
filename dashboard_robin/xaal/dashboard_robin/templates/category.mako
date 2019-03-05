<%inherit file="base.mako"/>

%if category == "Type" :
	<% 
		dynamic = False 
	%>
	%for object in objects :
		%if (object['list']['dynamic'] == 'True') :
			<% dynamic = True %>
		%endif
	%endfor

	%if dynamic :
		%for dev in devs :
			<% 
				balise = title.lower() + '-basic'
				helper = {'barometer': 'pressure','hygrometer': 'humidity', 'windgauge': 'windStrength', 'thermometer': 'temperature'}
				source = {'lamp-dimmer': '/static/imgs/lampe-profile.png',
									'powerrelay-basic': '/static/imgs/lampe-profile.png',
									'barometer-basic': '/static/imgs/barometer-profile.png',
									'hygrometer-basic': '/static/imgs/hygrometer-profile2.png',
									'windgauge-basic': '/static/imgs/windgauge-profile.png',
									'hmi-basic': '/static/imgs/hmi-profile.jpeg',
									'thermometer-basic': '/static/imgs/thermometer-profile.png',
									'gateway-basic': '/static/imgs/gateway-profile2.png'}
			%>
			%if 'lamp' in balise :
				<% balise = 'lamp-dimmer' %>
			%endif
				%try :
					<% 
						attr = helper[title.lower()] 
						input = dev.attributes[attr]
					%>
				%except :
					<% input = '' %>
				%endtry

			<% src = source[balise] %>

			%if (title.lower() in dev.devtype):
				<div class='col-sm-3'>
					<${balise} address=${dev.address} title=${dev.devtype} value=${input} src=${src}></${balise}>
				</div>							
			%endif
		%endfor
	%endif

	%for object in objects :
		%for static in object['list']['static'] :
			%try :
				<div class='col-sm-3'>
					<${balise} address=${static['address']} title=${static['title']}  value=${static['value']} src=${static['src']}></${balise}>
				</div>
			%except :
				<% 
					# do nothing 
				%>
			%endtry
		%endfor
	%endfor

%else :

	%for device in list :
		<div class='col-sm-3'>
		<% is_here = devs.fetch_one_kv('nickname', device['nickname']) %>
		%if is_here :
			%try:
				<${device['component_type']} address=${is_here.address} title=${device['nickname']} src=${device['src']} width=${device['width']} value=${is_here.attributes[device['value']]}></${device['component_type']}>
			%except :
				<%
					# do nothing
				%>
			%endtry
		%else :
			<notfound-device name=${device['nickname']} src=${device['src']}></notfound-device>	
		%endif
		</div>
	%endfor

%endif