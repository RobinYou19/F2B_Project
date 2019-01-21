<%inherit file="base.mako"/>

<body>

  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        %if "lamp" in dev.devtype :
          <img src="/static/imgs/lampe-profile.png" alt="Lamp Profile" style="width:300px;height:300px;">
        %elif "thermometer" in dev.devtype :
          <img src="/static/imgs/thermometer-profile.svg" alt="Thermometer Profile" style="width:300px;height:300px;">
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
      </div>
    </div>
  </div>

</body>