/* @author : You Robin */

//########################################################################
//@CLOCK

window.onload = function() 
{
	tick();
};

function tick()
{
  try
  {
    var hoursTicker = document.getElementById("hours");
    var minutesTicker = document.getElementById("minutes");
    
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes(); 

    var angleHours = h/12 * 360 - 90;
    var angleMinutes = m/60 * 360 - 90;

    m = m.toString();
    h = h.toString();

    if (m.length == 1)
    {
      m = "0" + m;
    }
    
    hoursTicker.style.cssText = "-webkit-transform: rotate("+ angleHours + "deg);"
    minutesTicker.style.cssText = "-webkit-transform: rotate("+ angleMinutes + "deg);"
    
    document.getElementById("digital").innerHTML = "<b>"+ h +  " : " + m + "</b>";
    
    setTimeout('tick()',60000);
  }
  catch(err)
  {
    // DO NOTHING
  }
};

//########################################################################
//@TITLE COMPONENT

class Title extends HTMLElement
{
  static get observedAttributes()
  {
    return ['value'];
  }

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
      this.title = "No Title";
    }
    if (this.hasAttribute('value'))
    {
      this.value = this.getAttribute('value');
    }
    else
    {
      this.value = "No Value";
    }

    if (!this.shadowRoot)
    {
      var shadow = this.attachShadow({mode : 'open'});

      var titleContent = document.createElement('h4');

      if (this.value != "No Value")
      {
        titleContent.innerHTML = this.title + " :<br>" + this.value;      
      }
      else
      {
        titleContent.innerHTML = this.title
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

  attributeChangedCallback(name, oldValue, newValue)
  {
    try 
    {
      const shadow = this.shadowRoot;
      const childNodes = Array.from(shadow.childNodes);
      var titleContent = childNodes[1];

      if (titleContent.innerHTML.includes("barometer"))
      {
        titleContent.innerHTML = 'barometer.basic :<br>' + newValue + " hPa";
      }
      else if (titleContent.innerHTML.includes("hygrometer") || this.title.includes("rh"))
      {
        titleContent.innerHTML = 'hygrometer.basic :<br>' + newValue + "%";
      }
      else if (titleContent.innerHTML.includes("windgauge"))
      {
        titleContent.innerHTML = 'windgauge.basic :<br>' + newValue + " km/h";
      }
      else if (titleContent.innerHTML.includes("thermometer") || this.title.includes("temp"))
      {
        titleContent.innerHTML ='thermometer.basic :<br>' + newValue + "°C";
      }
      else if (titleContent.innerHTML.includes("powermeter"))
      {
        titleContent.innerHTML ='powermeter.basic :<br>' + newValue + " W";
      }
    }
    catch(err)
    {
      //Do Nothing
    }
  }
}

customElements.define('basic-title', Title);

//########################################################################
//@IMAGE COMPONENT

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
      this.address = "No Address";
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
      var style   = document.createElement('style');

      if (this.address != "No Address")
      {
        var dest = "/generic/" + this.address;
      }
      else
      {
        var dest = "#";
      }

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

//########################################################################
//@ONOFFBUTTONS COMPONENT

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

      onButton.addEventListener('click', function()
      {
        var addr = this.id.replace('ON', '');
        console.log("ON request sent to " + addr);
        sio_send_request(addr, 'on', {});
      })

      offButton.addEventListener('click', function()
      {
        var addr = this.id.replace('OFF', '');
        console.log("OFF request sent to " + addr);
        sio_send_request(addr, 'off', {});
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

//########################################################################
//@UDSBUTTONS COMPONENT

class UDSButtons extends HTMLElement
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
      var shadow     = this.attachShadow({mode : 'open'});
      var style      = document.createElement('style');
      var upButton   = document.createElement('button');
      var downButton = document.createElement('button');
      var stopButton = document.createElement('button');

      var upButtonId   = "UP" + this.address ;
      var downButtonId = "DOWN" + this.address;
      var stopButtonId = "STOP" + this.address;

      upButton.setAttribute('id', upButtonId);
      downButton.setAttribute('id', downButtonId);
      stopButton.setAttribute('id', stopButtonId);

      upButton.setAttribute('class', 'button button-up');
      downButton.setAttribute('class', 'button button-down');
      stopButton.setAttribute('class', 'button button-stop');

      upButton.innerHTML   = "UP";
      downButton.innerHTML = "DOWN";
      stopButton.innerHTML = "STOP";

      upButton.addEventListener('click', function()
      {
        var addr = this.id.replace('UP', '');
        sio_send_request(addr, 'up', {});
        console.log("UP request sent to " + addr);
      })

      downButton.addEventListener('click', function()
      {
        var addr = this.id.replace('DOWN', '');
        sio_send_request(addr, 'down', {});
        console.log("DOWN request sent to " + addr);
      })

      stopButton.addEventListener('click', function()
      {
        var addr = this.id.replace('STOP', '');
        sio_send_request(addr, 'stop', {});
        console.log("STOP request sent to " + addr);
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

      .button-up
      {
        background-color: rgb(28, 184, 65);
        padding: 5px 14px;
      }

      .button-up:hover 
      {
        background-color: #3e8e41
      }

      .button-down
      {
        padding: 5px 10px;
        background-color: rgb(202, 60, 60);
      }

      .button-down:hover 
      {
        background-color: rgb(180, 60, 60);
      }

      .button-stop
      {
        padding: 5px 10px;
        background-color: rgb(255, 216, 0);
      }

      .button-stop:hover
      {
        background-color: rgb(184, 134, 11);
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(upButton);
      shadow.appendChild(downButton);
      shadow.appendChild(stopButton);
    }
  }
}

customElements.define('uds-buttons', UDSButtons);

//######################################################################

class TitleImage extends HTMLElement
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
      this.title = 'TitleImage';
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
      this.value = 'No Value';
    }
    if (this.hasAttribute('class'))
    {
      this.class = this.getAttribute('class');
    }
    else
    {
      this.class = 'box';
    }

    if (!this.shadowRoot)
    {
      var shadow  = this.attachShadow({mode : 'open'});
      var content = document.createElement('div');
      var style   = document.createElement('style');
      var image   = document.createElement('image-basic');

      var title = document.createElement('basic-title');
      title.setAttribute('title', this.title);
      title.setAttribute('value', this.value);

      var div_id = "basic_device" + this.address ;
      content.setAttribute('div', div_id);
      content.setAttribute('class', this.class);

      image.setAttribute('src', this.src);
      image.setAttribute('height', this.height);
      image.setAttribute('width', this.width);
      image.setAttribute('address', this.address);

      shadow.appendChild(style);
      shadow.appendChild(content);
      content.appendChild(title);
      content.appendChild(image);
    }
  }
}

customElements.define('title-image', TitleImage);
