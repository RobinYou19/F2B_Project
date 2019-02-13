<%inherit file="base.mako"/>

<body>

  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
      	<img src="/static/imgs/user-profile.png" alt="User Account" style="width:300px;height:400px;">
      </div>
      <div class="flip-card-back">
      <h3> Admin </h3>
      <% size = len(devs) %>
      <h5> Number of XAAL Core Monitor Devices : ${size} </h5>
      </div>
    </div>
  </div>
</body>