<%inherit file="base.mako"/>

<%
	power_relay_address_list = ""
	actions_list = ""
%>
%for dev in devs : 
	%if "powerrelay.basic" in dev.devtype :
		<% 
			power_relay_address_list += dev.address + "###"
			actions_list            += "off" + "###"
		%>
	%endif
%endfor


<div class='col-sm-3'>
	<basic-scenario address_list=${power_relay_address_list} actions_list=${actions_list}></basic-scenario>
</div>