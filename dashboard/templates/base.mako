<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Menu</title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="manifest" href="/static/manifest.json">
  <link rel="stylesheet" href="/static/css/menu.css">
  <link rel="stylesheet" href="/static/fonts/fontawesome/css/all.css">
</head>
<body>
  <div class="topnav" id="myTopnav">
    <a href="menu.mako" style="color:#3290B1">Menu</a>
    <a href="house.html">House</a>
    <a href="modules.html">Modules</a>
    <a href="scenarios.html">Scenarios</a>
    <a href="favorites.html">Favorites</a>
    <a href="configuration.html">Configuration</a>
    <a href="account.html">Account</a>
    <a href="javascript:void(0);" class="icon" onclick="menuDisplay()">
      <i class="fa fa-bars"></i>
    </a>
  </div>

  <div id="main">
    ${self.body()}
</div>

</body>
<script type="text/javascript" src="static//Multitouch/hammer.js"></script>
<script src="/static/js/menu.js"></script>
<script src="/static/js/touch.js"></script>

<script src="/static/js/riot+compiler.min.js"></script>
<script src="/static/js/socket.io.slim.js"></script>

<script src="/static/js/site.js"></script>
</html>


