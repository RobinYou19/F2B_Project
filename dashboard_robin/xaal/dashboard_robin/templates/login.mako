<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="/static/css/login.css">
</head>

<body>

<form class="box" action="/login" method="post">
  <input type="text" placeholder="Username" name="pseudo">
  <input type="password" placeholder="Password" name="password">
  <input type="submit" value="login">
</form>

</body>


<script src="/static/js/database/id.js"></script>
<script>
  function digestMessage(message) 
  {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  function hexString(buffer) 
  {
    const byteArray = new Uint8Array(buffer);

    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, '0');
      return paddedHexCode;
    });

    return hexCodes.join('');
  }

  function check()
  {
    var inputs = document.getElementsByTagName('input');
    var pseudo = inputs[0].value;
    var passwd = inputs[1].value;
    var bool   = false;
    const to_encode = passwd;
    const to_check = digestMessage(to_encode).then(digestValue =>
    {
      encrypted_passwd = hexString(digestValue);
  
      for (var i = 0; i < database.length; i++)
      {
        if (pseudo == database[i][0]) 
        {
          if (encrypted_passwd == database[i][1]) 
          {
            bool = true ;
          }
        }
      }
      if (bool)
      {
        window.location.href = "http://localhost:9090/menu";
      }
    });
  }

</script>

  </body>
</html>
