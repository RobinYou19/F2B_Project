<%inherit file="base.mako"/>

%if scenarios['default'] == "true" :

  <a class="nav-link active" href="/on_dimmer_lamp_scenario">
    <div class='col-sm-3'>
      <div class='link_category'><b>Turn On All Lamp Dimmer</b></div>
    </div>
  </a>

  <a class="nav-link" href="/off_dimmer_lamp_scenario">
    <div class='col-sm-3'>
      <div class='link_category'><b>Turn Off All Lamp Dimmer</b></div>
    </div>
  </a>

  <a class="nav-link" href="/on_power_relay_scenario">
    <div class='col-sm-3'>
      <div class='link_category'><b>Turn On All Power Relays</b></div>
    </div>
  </a>

  <a class="nav-link" href="/off_power_relay_scenario">
    <div class='col-sm-3'>
      <div class='link_category'><b>Turn Off All Power Relays</b></div>
    </div>
  </a>

%endif