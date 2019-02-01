<%inherit file="base.mako"/>
<%namespace name="widgets" file="widgets.mako" />

<div class="grid-background">
<div class="grid">

  <div class="grid-box">
    <div style="text-align:center;">
      ${widgets.lamp('lamp_entree')}
      ${widgets.lamp('lamp_couloir')}       
    </div>
  </div>

  <div class="grid-box">
    <div style="text-align:center;">
      ${widgets.lamp('lamp_salon')}
      ${widgets.lamp('lamp_salle')}       
    </div>
  </div>

  <div class="grid-box">
    <div style="text-align:center;">
      ${widgets.lamp('lamp_cuisine')}
      ${widgets.lamp('lamp_sdb')}       
    </div>
  </div>


  <div class="grid-box">
    <div style="text-align:center;">
      <b>Volet cuisine</b>
     <span data-is="shutter" xaal_addr="2fe70f46-3ece-44d1-af34-2d82e10fb854"></span>
    </div>
  </div>

  <div class="grid-box">   
    <div style="text-align:center;">
      <b>Volet SDB</b>
     <span data-is="shutter" xaal_addr="e4b05165-be5d-46d5-acd0-4da7be1158ed"></span>
    </div>
  </div>

  
  
  <div class="grid-box">
    <div style="text-align:center;">
      ${widgets.lamp('lamp_test')}
    </div>
  </div>

  <div class="grid-box">
    <b>Température</b>
    ${widgets.list_thermometer(['temp_owm','temp_bureau'])}
  </div>

  <div class="grid-box">
    <b>Humidité</b>
    ${widgets.list_hygrometer(['rh_owm','rh_bureau'])}
  </div>

 <div class="grid-box">
  <div style="text-align:center;">
    <b>Wall Plug</b>
    <span data-is="powerrelay" xaal_addr="5e50a1ed-5290-4cdb-b00f-1f968eee4401"></span>
    <br/>
    <span data-is="powermeter" xaal_addr="5e50a1ed-5290-4cdb-b00f-1f968eee4402"></span>
  </div>
 </div>


<div class="grid-box">
  <div style="text-align:center;">
    <b>Test1</b>
    <span data-is="lamp" xaal_addr="f49a7f0a-e436-11e8-a1ff-0800277d6d99"></span>
    <span data-is="lamp" xaal_addr="0a238b82-0760-11e8-b576-00fec8f71301"></span>
  </div>
 </div>
 

  <div class="grid-box two">
    <div data-is="generic-attrs" xaal_addr="7b81512c-0a96-11e8-ad38-3c77e618c6f7"></div>
  </div>

  <div class="grid-box two" style="align:center;">
    	<!-- img src="http://10.77.3.51/video3.mjpg" width=250 -->
  </div>

  <div class="grid-box" style="text-align:center;">
    <br/><br/><br/>
      <span data-is="clock"/>
  </div>

  
</div> <!-- end of grid -->
</div><!-- end of grib background -->

<script type="riot/tag" src="/static/tags/powerrelay.tag"></script>
<script type="riot/tag" src="/static/tags/hygrometer.tag"></script>
<script type="riot/tag" src="/static/tags/thermometer.tag"></script>
<script type="riot/tag" src="/static/tags/powermeter.tag"></script>
<script type="riot/tag" src="/static/tags/lamp.tag"></script>
<script type="riot/tag" src="/static/tags/shutter.tag"></script>


<script type="riot/tag" src="/static/tags/generic_attrs.tag"></script>
<script type="riot/tag" src="/static/tags/clock.tag"></script>
