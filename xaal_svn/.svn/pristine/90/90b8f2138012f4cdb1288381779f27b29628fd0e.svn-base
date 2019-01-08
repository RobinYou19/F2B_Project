<%def name="thermometer(addr)">
<a href="/generic/${addr}">
  <div data-is="thermometer" xaal_addr=${addr}></div>
</a>
</%def>


<%def name="hygrometer(addr)">
<a href="/generic/${addr}">
  <div data-is="hygrometer" xaal_addr=${addr}></div>
</a>
</%def>


<%def name="lamp(nickname)">
<% dev = devices.fetch_one_kv('nickname',nickname) %>
% if dev:
  <b>${dev.get_kv('name')}</b><a href="./generic/${dev.address}">&nbsp;</a>
  <span data-is="lamp" xaal_addr=${dev.address}></span>
% else:
  device not found: <b>${nickname}</b>
% endif
</%def>


<%def name="list_thermometer(values)">
<table>
% for nick in values:
<% dev = devices.fetch_one_kv('nickname',nick) %>
% if dev:
<tr>
  <td>${dev.get_kv('name')}</td>
  <td>
    <a href="./generic/${dev.address}">
      <span data-is="thermometer" xaal_addr=${dev.address}>
    </a>
  </td>
</tr>
% endif
% endfor
</table>
</%def>


<%def name="list_hygrometer(values)">
<table>
% for nick in values:
<% dev = devices.fetch_one_kv('nickname',nick) %>
% if dev:
<tr>
  <td>${dev.get_kv('name')}</td>
  <td>
    <a href="./generic/${dev.address}">
      <span data-is="hygrometer" xaal_addr=${dev.address}>
    </a>
  </td>
</tr>
% endif
% endfor
</table>
</%def>
