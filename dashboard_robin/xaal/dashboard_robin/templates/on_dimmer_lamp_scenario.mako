<%inherit file="base.mako"/>

<%
	lamp_dimmer_adress_list = ""
	actions_list = ""
%>
%for dev in devs : 
	%if "lamp.dimmer" in dev.devtype :
		<% 
			lamp_dimmer_adress_list += dev.address + "###"
			actions_list            += "on" + "###"
		%>
	%endif
%endfor


<div class='col-sm-3'>
	<basic-scenario address_list=${lamp_dimmer_adress_list} actions_list=${actions_list}></basic-scenario>
</div>