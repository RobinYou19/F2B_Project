<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${title}</title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="manifest" href="/static/manifest.json">
  <link rel="stylesheet" href="/static/css/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="/static/css/main_1.css">
  <link rel="stylesheet" href="/static/fonts/fontawesome/css/all.css">
  <link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>

</head>
<body>
  <div class="topnav" id="myTopnav">
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
  </div>

  <div id="main">
    ${self.body()}
  </div>

</body>
<script src="/static/js/hammer.js"></script>
<script src="static/js/navigation.js"></script>

<script src="/static/js/riot+compiler.min.js"></script>
<script src="/static/js/socket.io.slim.js"></script>

<script src="/static/js/site_3.js"></script>

<script src="/static/js/scenario.js"></script>
<script src="/static/js/aux_components.js"></script>
<script src="/static/js/components_11.js"></script>
<script src="/static/js/device_0.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="static/css/bootstrap/js/bootstrap.min.js"></script>
</html>