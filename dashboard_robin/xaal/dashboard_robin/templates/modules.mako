<%inherit file="base.mako"/>

%for module in modules :
	<div class='col-sm-4'>
		<div class='link_category'>
		%try :
				<basic-title title=${module['name']}></basic-title>
				<a href=${module['href']}>
					<img src=${module['src']} alt=${module['alt']} height=${module['height']} width=${module['width']}></img>
				</a>
		%except :
			<% 
				#do nothing 
			%>
		%endtry
		</div>
	</div>
%endfor