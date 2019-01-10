<%inherit file="base.mako"/>

<table width=100% class="sortable" id="devices">
  <tr><th width=20%>Address</th><th width=15%>devtype</th><th width=15%>Name</th><th width=15%>Info</th><th width=35%>Attributes</th></tr>
  % for dev in devs:  
  <tr>
    <td><a href="/generic/${dev.address}">${dev.address}</a></td>
    <td>${dev.devtype}</td>
    <td><a href="/edit_metadata/${dev.address}">➠</a> ${dev.display_name}</td>
    %if 'info' in dev.description.keys():
       <td>${dev.description['info']}</td>
    %else:
       <td>--</td>
    %endif
    %if 'embedded' in dev.attributes.keys():
        <td>embedded</td>
    %else:
        <td>${dev.attributes}</td>
    %endif
  </tr>
  % endfor
</table>