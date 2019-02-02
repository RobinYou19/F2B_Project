window.onload = function() 
{
	tick();
};

function tick()
{
  var hoursTicker = document.getElementById("hours");
  var minutesTicker = document.getElementById("minutes");
  
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes(); 

  var angleHours = h/12 * 360 - 90;
  var angleMinutes = m/60 * 360 - 90;
  
  hoursTicker.style.cssText = "-webkit-transform: rotate("+ angleHours + "deg);"
  minutesTicker.style.cssText = "-webkit-transform: rotate("+ angleMinutes + "deg);"
  
  document.getElementById("digital").innerHTML = h + " : " + m;
  
  setTimeout('tick()',60000);
};

class basicTitle extends HTMLElement
{
  constructor()
  {
    super();
  }

  connectedCallback()
  {
    if (this.hasAttribute('title'))
    {
      this.title = this.getAttribute('title');
    }
    else
    {
      this.title = "Unfound Title";
    }

    if (!this.shadowRoot)
    {
      var shadow = this.attachShadow({mode : 'open'});

      var titleContent = document.createElement('h4');
      titleContent.innerHTML = this.title;

      var style = document.createElement('style');
      style.textContent = `
      h4
      {
        font-style: bold;
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(titleContent);
    }
  }
}

customElements.define('title-basic', basicTitle);

class valueTitle extends HTMLElement
{
  constructor()
  {
    super();
  }

  connectedCallback()
  {
    if (this.hasAttribute('title'))
    {
      this.title = this.getAttribute('title');
    }
    else
    {
      this.title = "Unfound Title";
    }
    if (this.hasAttribute('value'))
    {
      this.value = this.getAttribute('value');
    }
    else
    {
      this.value = "Unfound Value";
    }

    if (!this.shadowRoot)
    {
      var shadow = this.attachShadow({mode : 'open'});

      var titleContent = document.createElement('h4');
      titleContent.innerHTML = this.title + " :<br>" + this.value;

      if (this.title.includes("barometer"))
      {
        titleContent.innerHTML += "hPa";
      }
      else if (this.title.includes("hygrometer"))
      {
        titleContent.innerHTML += "%";
      }
      else if (this.title.includes("windgauge"))
      {
        titleContent.innerHTML += "km/h";
      }
      else if (this.title.includes("thermometer"))
      {
        titleContent.innerHTML += "°C";
      }
      else
      {
        titleContent.innerHTML += "";
      }

      var style = document.createElement('style');
      style.textContent = `
      h4
      {
        font-style: bold;
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(titleContent);
    }
  }
}

customElements.define('title-value', valueTitle);

class basicImage extends HTMLElement
{
  constructor()
  {
    super();
  }

  connectedCallback()
  {
    if (this.hasAttribute('src'))
    {
      this.src = this.getAttribute('src');
    }
    else
    {
      this.src = "/static/imgs/default-object.png";
    }

    if (this.hasAttribute('address'))
    {
      this.address = this.getAttribute('address');
    }
    else
    {
      this.address = "";
    }

    if (this.hasAttribute('height'))
    {
      this.height = this.getAttribute('height');
    }
    else
    {
      this.height = '50';
    }

    if (this.hasAttribute('width'))
    {
      this.width = this.getAttribute('width');
    }
    else
    {
      this.width = '50';
    }

    if (!this.shadowRoot)
    {
      var shadow  = this.attachShadow({mode : 'open'});
      var link    = document.createElement('a');
      var img     = document.createElement('img');
      var dest    = "/generic/" + this.address;
      var style   = document.createElement('style');

      link.setAttribute('href', dest);
      img.setAttribute('src',    this.src);
      img.setAttribute('height', this.height);
      img.setAttribute('width',  this.width);

      style.textContent = ``;

      shadow.appendChild(style);
      shadow.appendChild(link);
      link.appendChild(img);
    }
  }
}

customElements.define('image-basic', basicImage);

class OnOffButtons extends HTMLElement
{
  constructor()
  {
    super();
  }
  connectedCallback()
  {
    if (this.hasAttribute('address'))
    {
      this.address = this.getAttribute('address');
    }
    else
    {
      this.address = "";
    }

    if (!this.shadowRoot)
    {
      var shadow    = this.attachShadow({mode : 'open'});
      var style     = document.createElement('style');
      var onButton  = document.createElement('button');
      var offButton = document.createElement('button');

      var onButtonId  = "ON" + this.address ;
      var offButtonId = "OFF" + this.address;

      onButton.setAttribute('id', onButtonId);
      offButton.setAttribute('id', offButtonId);

      onButton.setAttribute('class', 'button button-on');
      offButton.setAttribute('class', 'button button-off');

      onButton.innerHTML  = "ON";
      offButton.innerHTML = "OFF";

      var address = this.address;

      onButton.addEventListener('click', function()
      {
        var addr = this.id.replace('ON', '');
        sio_send_request(addr, 'on', {});
        console.log("ON request sent to " + addr);
      })

      offButton.addEventListener('click', function()
      {
        var addr = this.id.replace('OFF', '');
        sio_send_request(addr, 'off', {});
        console.log("OFF request sent to " + addr);
      })

      style.textContent = `
      .button 
      {
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        background-color: #aaa;
        border: none;
        border-radius: 15px;
        box-shadow: 0 2px #999;
        margin: 1px 1px 3px 1px;
      }

      .button:active 
      {
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }

      .button-on
      {
        background-color: rgb(28, 184, 65);
        padding: 5px 14px;
      }

      .button-on:hover 
      {
        background-color: #3e8e41
      }

      .button-off
      {
        padding: 5px 10px;
        background-color: rgb(202, 60, 60);
      }

      .button-off:hover 
      {
        background-color: rgb(180, 60, 60)
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(onButton);
      shadow.appendChild(offButton);
    }
  }
}

customElements.define('onoff-buttons', OnOffButtons);


class OnOffDevice extends HTMLElement 
{
  constructor() 
  {
    super();
  }

  connectedCallback()
  {
    if (this.hasAttribute('address'))
    {
      this.address = this.getAttribute('address');
    }
    else
    {
      this.address = "";
    }
    if (this.hasAttribute('status'))
    {
      this.status = this.getAttribute('status');
    }
    else
    {
      this.status = "";
    }
    if (this.hasAttribute('src'))
    {
      this.src = this.getAttribute('src');
    }
    else
    {
      this.src = "/static/imgs/default-image.jpeg";
    }
    if (this.hasAttribute('title'))
    {
      this.title = this.getAttribute('title');
    }
    else
    {
      this.title = 'OnOffDevice';
    }
    if (this.hasAttribute('height'))
    {
      this.height = this.getAttribute('height');
    }
    else
    {
      this.height = '50';
    }
    if (this.hasAttribute('width'))
    {
      this.width = this.getAttribute('width');
    }
    else
    {
      this.width = '50';
    }

    if (!this.shadowRoot)
    {
      var shadow  = this.attachShadow({mode : 'open'});
      var content = document.createElement('div');
      var style   = document.createElement('style');
      var title   = document.createElement('title-basic');
      var image   = document.createElement('image-basic');
      var buttons = document.createElement('onoff-buttons');
      var endline = document.createElement('br');

      var div_id  = 'on_off_device' + this.address ;
      content.setAttribute('id', div_id);
      if (this.status == "True")
      {
        content.setAttribute('class', 'box box-on');
      }
      else
      {
        content.setAttribute('class', 'box box-off');
      }

      title.setAttribute('title', this.title);

      image.setAttribute('src', this.src);
      image.setAttribute('height', this.height);
      image.setAttribute('width', this.width);
      image.setAttribute('address', this.address);

      buttons.setAttribute('address', this.address);

      style.textContent = `
      .box 
      {
        border-style: groove;
        border-radius: 5px;
        height: 150%;
        margin: 5%;
      }

      .box-on
      {
        background-color: #4DEE63;
      }

      .box-off
      {
        background-color: #F88752;
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(content);
      content.appendChild(title);
      content.appendChild(image);
      content.appendChild(endline);
      content.appendChild(buttons);
    }
  }
}

customElements.define('onoff-device', OnOffDevice);

class BasicDevice extends HTMLElement
{
  constructor()
  {
    super();
  }

  connectedCallback()
  {
    if (this.hasAttribute('address'))
    {
      this.address = this.getAttribute('address');
    }
    else
    {
      this.address = "";
    }
    if (this.hasAttribute('src'))
    {
      this.src = this.getAttribute('src');
    }
    else
    {
      this.src = "/static/imgs/default-image.jpeg";
    }
    if (this.hasAttribute('title'))
    {
      this.title = this.getAttribute('title');
    }
    else
    {
      this.title = 'BasicDevice';
    }
    if (this.hasAttribute('height'))
    {
      this.height = this.getAttribute('height');
    }
    else
    {
      this.height = '50';
    }
    if (this.hasAttribute('width'))
    {
      this.width = this.getAttribute('width');
    }
    else
    {
      this.width = '50';
    }
    if (this.hasAttribute('value'))
    {
      this.value = this.getAttribute('value');
    }
    else
    {
      this.value = "NoValue";
    }

    if (!this.shadowRoot)
    {
      var shadow  = this.attachShadow({mode : 'open'});
      var content = document.createElement('div');
      var style   = document.createElement('style');
      var image   = document.createElement('image-basic');

      if (this.value != "NoValue")
      {
        var title = document.createElement('title-value');
        title.setAttribute('title', this.title);
        title.setAttribute('value', this.value);
      }
      else
      {
        var title = document.createElement('title-basic');
        title.setAttribute('title', this.title);
      }

      var div_id = "basic_device" + this.address ;
      content.setAttribute('div', div_id);
      content.setAttribute('class', 'box');

      image.setAttribute('src', this.src);
      image.setAttribute('height', this.height);
      image.setAttribute('width', this.width);
      image.setAttribute('address', this.address);

      style.textContent = `
      .box 
      {
        background-color: rgba(255, 255, 255, .5);
        border-style: groove;
        border-radius: 5px;
        height: 150%;
        margin: 5%;
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(content);
      content.appendChild(title);
      content.appendChild(image);
    }
  }
}

customElements.define('basic-device', BasicDevice);