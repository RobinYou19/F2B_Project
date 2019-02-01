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
      this.src = "/static/imgs/no-image.png";
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


class divTitle extends HTMLElement
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

      var div = document.createElement('div');
      div.setAttribute('class', 'test_class');

      var title_basic = document.createElement('title-basic');
      title_basic.setAttribute('title', this.title);

      var style = document.createElement('style');
      style.textContent = `
      .test_class
      {
        color : red;
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(div);
      div.appendChild(title_basic);
    }
  }
}

customElements.define('div-title', divTitle);


class Lamp extends HTMLElement 
{
  constructor() 
  {
    super();
    this.address = this.getAttribute('address');
    this.status  = this.getAttribute('status');

    this.render(this.address, this.status);
  }

  render(address, status)
  {
    var img  = "/static/imgs/lampe-profile.png";

      this.innerHTML = "<div id='lamp_dimmer' class='box'>" +
                        "<h5>Light" + "</h5>" +
                        "<a href = /generic/" + address +">" +
                        "<img src=" + img + " height='50' width='50'>" + "</a>" + "<br>" +
                        "<button type='button' id='lamponButton'  class='btn btn-success'>  ON  </button>" +
                        "<button type='button' id='lampoffButton' class='btn btn-danger'>  OFF  </button>" +
                        "</div>" ;

    var lamponButton = document.getElementById("lamponButton");
    var lampoffButton = document.getElementById("lampoffButton");

    var new_on_button_id  = "lamponButton" + address ;
    var new_off_button_id = "lampoffButton" + address;

    lamponButton.setAttribute("id", new_on_button_id);
    lampoffButton.setAttribute("id", new_off_button_id);

    var lamp_dimmer_div = document.getElementById("lamp_dimmer");
    var new_lamp_div_id = "lamp_dimmer" + address ;
    lamp_dimmer_div.setAttribute("id", new_lamp_div_id);

    lamponButton.onclick = function ()
    {
      sio_send_request(address, 'on', {});
      console.log('on request sended to ' + address);
    }

    lampoffButton.onclick = function ()
    {
      sio_send_request(address, 'off', {});
      console.log('off request sended to ' + address);
    }

    var total_div = document.getElementById(new_lamp_div_id);

    if (status == "True")
    {
      total_div.style.backgroundColor = "#4DEE63";
    }
    else
    {
      total_div.style.backgroundColor = "#F88752";
    }
  }
}

customElements.define('lamp-dimmer', Lamp);

class Thermometer extends HTMLElement
{
  constructor()
  {
    super();
    this.address = this.getAttribute('address');
    this.temperature = this.getAttribute('temperature');
    this.update(this.address , this.temperature);
  }

  update(address, temperature)
  {
    var img = "static/imgs/thermometer-profile.png";
    this.innerHTML = "<div class='box'>" +
                     "<h5>Thermometer : " + temperature + "°C </h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='16'>" + "<br>" + "</a>" +
                     "</div>" ;
  }
}

customElements.define('thermometer-basic', Thermometer);

class Barometer extends HTMLElement 
{
  constructor()
  {
    super();
    this.address  = this.getAttribute('address');
    this.pressure = this.getAttribute('pressure');
    this.update(this.address , this.pressure);
  }

  update(address, pressure)
  {
    var img = "static/imgs/barometer-profile.png";

    this.innerHTML = "<div class='box'>" +
                 "<h5>Barometer : " + pressure + " hPa </h5>" +
                 "<a href = /generic/" + address +">" +
                 "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                 "</div>" ;
  }
}

customElements.define('barometer-basic' , Barometer);

class Hygrometer extends HTMLElement 
{
  constructor()
  {
    super();
    this.address  = this.getAttribute('address');
    this.humidity = this.getAttribute('humidity');

    this.update(this.address , this.humidity);
  }

  update(address , humidity)
  {
    var img = "static/imgs/hygrometer-profile.png";

    this.innerHTML = "<div class='box'>" +
                     "<h5>Hygrometer : " + humidity + " % </h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "</div>" ;
  }
}

customElements.define('hygrometer-basic' , Hygrometer);

class Windgauge extends HTMLElement 
{
  constructor()
  {
    super();
    this.address  = this.getAttribute('address');
    this.strength = this.getAttribute('strength');
    this.angle    = this.getAttribute('angle');
    this.update(this.address, this.strength, this.angle);
  }

  update(address, strength, angle)
  {
    var img = "static/imgs/windgauge-profile.png";

    this.innerHTML = "<div class='box'>" +
                     "<h5>Windgauge : " + strength + "km/h -" + angle + "°</h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "</div>" ;
  }
}

customElements.define('windgauge-basic' , Windgauge);

class Gateway extends HTMLElement 
{
  constructor()
  {
    super();
    this.address = this.getAttribute('address');

    this.update(this.address);
  }

  update(address)
  {
    var img  = "static/imgs/gateway-profile.png";

    this.innerHTML = "<div class='box'>" +
                     "<h5>Gateway" + " </h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "</div>" ;
  }
}

customElements.define('gateway-basic' , Gateway);

class Hmi extends HTMLElement 
{
  constructor()
  {
    super();
    this.address = this.getAttribute('address');
    this.update(this.address);
  }

  update(address)
  {
    var img = "static/imgs/hmi-profile.png";

    this.innerHTML = "<div class='box'>" +
                     "<h5>HMI" +"</h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "</div>" ;
  }
}

customElements.define('hmi-basic' , Hmi);

class Powerrelay extends HTMLElement 
{
  constructor () 
  {
    super();
    this.address = this.getAttribute('address');
    this.power   = this.getAttribute('power');

    this.render(this.address, this.power);
  }

  render(address, power)
  {
    var img = "static/imgs/powerrelay-profile.png";

    if (power == "True")
    {
      this.innerHTML = "<div id='pr_basic' class='box'>" +
                        "<h5>Powerrelay" + "</h5>" +
                        "<a href = /generic/" + address +">" +
                        "<img src=" + img + " height='50' width='50'>" + "</a>" + "<br>" +
                        "<button type='button' id='pronButton'  class='btn btn-success'>  ON  </button>" +
                        "<button type='button' id='proffButton' class='btn btn-danger'>  OFF  </button>" +
                        "</div>" ;
    }
    else
    {
      this.innerHTML = "<div id='pr_basic' class='box'>" +
                        "<h5>Powerrelay" + "</h5>" +
                        "<a href = /generic/" + address +">" +
                        "<img src=" + img + " height='50' width='50'>" + "</a>" + "<br>" +
                        "<button type='button' id='pronButton'  class='btn btn-success'>  ON  </button>" +
                        "<button type='button' id='proffButton' class='btn btn-danger'>  OFF  </button>" +
                        "</div>" ;      
    }

    var pronButton = document.getElementById("pronButton");
    var proffButton = document.getElementById("proffButton");

    var new_on_button_id  = "pronButton" + address ;
    var new_off_button_id = "proffButton" + address;

    pronButton.setAttribute("id", new_on_button_id);
    proffButton.setAttribute("id", new_off_button_id);

    var pr_basic_div = document.getElementById("pr_basic");
    var new_pr_div_id = "pr_basic" + address ;
    pr_basic_div.setAttribute("id", new_pr_div_id);

    pronButton.onclick = function ()
    {
      sio_send_request(address, 'on', {});
      console.log('on request sended to ' + address);
    }

    proffButton.onclick = function ()
    {
      sio_send_request(address, 'off', {});
      console.log('off request sended to ' + address);
    }

    var total_div = document.getElementById(new_pr_div_id);

    if (power == "True")
    {
      total_div.style.backgroundColor = "#4DEE63";
    }
    else
    {
      total_div.style.backgroundColor = "#F88752";
    }
  }
}

customElements.define('powerrelay-basic', Powerrelay);