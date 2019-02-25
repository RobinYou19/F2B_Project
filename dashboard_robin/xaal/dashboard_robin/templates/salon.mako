<%inherit file="base.mako"/>

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
