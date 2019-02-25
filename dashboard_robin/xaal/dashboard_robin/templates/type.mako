<%inherit file="base.mako"/>

%for object in objects :
  %try :
    <%
      href  = object['href']
      type  = object['type']
    %>
    <a class="nav-link active" href=${href}>
      <div class='col-sm-3'>
        <div class='link_category'><b>${type}</b></div>
      </div>
    </a>
  %except :
  <%
    #do nothing
  %>
  %endtry
%endfor