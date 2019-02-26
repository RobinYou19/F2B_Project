<%inherit file="base.mako"/>

%if configuration['display_devices'] == "true" :
	<% dest = '/config_device' %>
	<a class="nav-link " href=${dest}>
	  <div class='col-sm-3'>
	    <div class='link_category'>
	    <b>Check Your Dynamic Devices Here !</b>
	   </div>
	  </div>
	</a>
%endif

%if configuration['display_config_file'] == "true" :
	<% dest = '/config_file' %>
	<a class="nav-link " href=${dest}>
	  <div class='col-sm-3'>
	    <div class='link_category'>
	    <b>Check Your Configuration File Here !</b>
	   </div>
	  </div>
	</a>
%endif