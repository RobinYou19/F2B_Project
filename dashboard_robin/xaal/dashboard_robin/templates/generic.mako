<%inherit file="base.mako"/>

<body>

  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">

        %if "lamp.dimmer" in dev.devtype :
          <img src="/static/imgs/lampe-profile.png" alt="Lamp Profile" style="width:300px;height:300px;">

        %elif "thermometer.basic" in dev.devtype :
          <img src="/static/imgs/thermometer-profile.svg" alt="Thermometer Profile" style="width:300px;height:300px;">

        %elif "barometer.basic" in dev.devtype :
          <img src="/static/imgs/barometer-profile.png" alt="Barometer Profile" style="width:280px;height:330px;">

        %elif "hygrometer.basic" in dev.devtype :
          <img src="/static/imgs/hygrometer-profile.png" alt="Hygrometer Profile" style="width:280px;height:330px;">

        %elif "windgauge.basic" in dev.devtype :
          <img src="/static/imgs/windgauge-profile.png" alt="Windgauge Profile" style="width:280px;height:330px;">

        %elif "gateway.basic" in dev.devtype :
          <img src="/static/imgs/gateway-profile.png" alt="Gateway Profile" style="width:280px;height:330px;">

        %elif "hmi.basic" in dev.devtype :
          <img src="/static/imgs/hmi-profile.png" alt="HMI Profile" style="width:280px;height:330px;">

        %elif "powerrelay.basic" in dev.devtype :
          <img src="/static/imgs/powerrelay-profile.png" alt="PowerRelay Profile" style="width:280px;height:330px;"> 

        %else :
          <img src="other-image.png" alt="Image Not Available for This Component" style="width:300px;height:300px;">     
        %endif

      </div>
      <div class="flip-card-back">
        <h2>Type ${dev.devtype}</h2> 
        <p>Address ${dev.address}</p> 
        % for k in dev.description:
        <%
          value = dev.description[k]
          if not value:
            continue
        %>
          <p>${k} : ${value}</p>
        %endfor
        <h4>Attributes : </h4>
        % for key in dev.attributes :
        <%
          value = dev.attributes[key]
          if not value:
            continue
        %>
          <p>${key} : ${value}</p>
        %endfor
      </div>
    </div>
  </div>

</body>