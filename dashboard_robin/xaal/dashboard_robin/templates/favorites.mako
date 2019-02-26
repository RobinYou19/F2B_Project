<%inherit file="base.mako"/>

%for device_type in favorites['dynamic']:
	%for dev in devs :
		%if device_type in dev.devtype :
			<%
				balise_name = device_type.replace('.','-')
			%>
			%if balise_name.count('lamp'):
				<%
					attr  = 'light'
					src   = 'static/imgs/lampe-profile.png'
					value = ''
				%>
				<div class='col-sm-3'>
					<${balise_name} address=${dev.address} title=${dev.devtype} status=${dev.attributes[attr]} src=${src} value=${value}></${balise_name}>				
				</div>
			%elif balise_name.count('relay'):
				<%
					attr  = 'power'
					src   = 'static/imgs/powerrelay-profile.png'
					value = ''
				%>
				<div class='col-sm-3'>
					<${balise_name} address=${dev.address} title=${dev.devtype} status=${dev.attributes[attr]} src=${src} value=${value}></${balise_name}>				
				</div>
			%elif balise_name.count('thermometer'):
				<%
					attr  = 'temperature'
					src   = 'static/imgs/thermometer-profile.png'
					value = dev.attributes[attr]
				%>
				<div class='col-sm-3'>
					<${balise_name} address=${dev.address} title=${dev.devtype} status=${dev.attributes[attr]} src=${src} value=${value}></${balise_name}>				
				</div>
			%endif
		%endif
	%endfor
%endfor