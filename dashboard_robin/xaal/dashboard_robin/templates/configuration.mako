<%inherit file="base.mako"/>

%for dev in devs :
	<% dest = '/edit_metadata/' + dev.address %>
	<a class="nav-link " href=${dest}>
	  <div class='col-sm-3'>
	    <div class='link_category'><b>${dev.devtype} : ${dev.address}</b></div>
	  </div>
	</a>
%endfor