<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${title}</title>
  <meta name="keywords"               content="" />
  <meta name="description"            content="" />
  <meta name="mobile-web-app-capable" content="yes" />
  <link rel ="stylesheet" href="/static/css/main_3.css">
  <link rel ="stylesheet" href="/static/fonts/fontawesome/css/all.css">
</head>

<body>
  <div class="topnav" id="myTopnav"><b>
    <a href="/menu">Menu</a>
    <a href="/house">House</a>
    <a href="/modules">Modules</a>
    <a href="/favorites">Favorites</a>
    <a href="/scenarios">Scenarios</a>
    <a href="/configuration">Configuration</a>
    <a href="/account">Account</a>
    <a href="javascript:void(0);" class="icon" onclick="menuDisplay()">
      <i class="fa fa-bars"></i>
    </a>
  </b></div>

  <div id="main">
    ${self.body()}
  </div>
</body>

<script src="/static/js/utils/hammer.js"></script>
<script src="/static/js/utils/utils.js"></script>

<script src="https://unpkg.com/lighterhtml"></script>
<script src="/static/js/components/scenario.js"></script>
<script src="/static/js/components/block_components_2.js"></script>
<script src="/static/js/components/components_2.js"></script>
<script src="/static/js/components/device_2.js"></script>

<script src="/static/js/socketio/socket.io.slim.js"></script>
<script src="/static/js/site.js"></script>

</html>