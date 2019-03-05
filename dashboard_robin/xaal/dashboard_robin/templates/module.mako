<%inherit file="base.mako"/>

<div class="topnav">
  %for object in objects :
    %try :
      <%
        href  = '/modules/' + title + '/' + object['type']
        type  = object['type']
      %>
      <a href=${href}>${type}</a>
    %except :
    <%
      #do nothing
    %>
    %endtry
  %endfor
</div>
