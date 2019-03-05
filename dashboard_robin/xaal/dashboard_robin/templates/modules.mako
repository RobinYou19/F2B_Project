<%inherit file="base.mako"/>

<div class="topnav">
	%for module in modules :
		<% href = '/modules/' + module['name'] %>
		<a href=${href}>${module['name']}</a>
	%endfor
</div>