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
  <link rel="stylesheet" href="/static/css/main_4.css">
  <link rel="stylesheet" href="/static/fonts/fontawesome/css/all.css">
  <link href='https://fonts.googleapis.com/css?family=Sofia' rel='stylesheet'>

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
<script src="static/js/utils/utils.js"></script>

<script src="/static/js/components/scenario.js"></script>
<script src="/static/js/components/block_components_1.js"></script>
<script src="/static/js/components/components_12.js"></script>
<script src="/static/js/components/device_1.js"></script>

<script src="/static/js/socketio/socket.io.slim.js"></script>
<script src="/static/js/site_1.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="static/css/bootstrap/js/bootstrap.min.js"></script>
</html>