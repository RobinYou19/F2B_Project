/* Tried to decrease as much as possible the dependencies on JS libraries (like jQuery)
*/
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
  
  /* Formula to convert the time into degrees */
  var angleHours = h/12 * 360 - 90;
  var angleMinutes = m/60 * 360 - 90;
  
  /*
    Formula
    angle = percentage (h/12 or m/60) * 360 - offset(90deg)
  */
  
  hoursTicker.style.cssText = "-webkit-transform: rotate("+ angleHours + "deg);"
  minutesTicker.style.cssText = "-webkit-transform: rotate("+ angleMinutes + "deg);"
  
  document.getElementById("digital").innerHTML = h + " : " + m;
  
  setTimeout('tick()',60000);
};


class Lamp extends HTMLElement 
{
  connectedCallback () 
  {
    this.address = this.getAttribute('address');
    this.on = "on";
    this.off= "off";

    var address = this.getAttribute('address');

    this.render(address);
  }

  render(address)
  {
    var toto = "toto";
    var img = "/static/imgs/light-off.svg";

    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                      "<h5>Light : " + "</h5>" +
                      "<a href = /generic/" + this.address +">" +
                      "<img src=" + img + ">" + "<br>" + "</a>" +
                      "<button type='button' id='onButton'  class='btn btn-success'>  ON  </button>" +
                      "<button type='button' id='offButton' class='btn btn-danger'>  OFF  </button>" +
                      "</div></div>" ;

    var onButton = document.getElementById("onButton");

    onButton.onclick = function ()
    {
      sio_send_request(address, 'on', {});
      console.log('on request sended to ' + address);
    }

    offButton.onclick = function ()
    {
      sio_send_request(address, 'off', {});
      console.log('off request sended to ' + address);
    }

  }

}

customElements.define('lamp-basic', Lamp);

function rise_temp()
{
  console.log("Rise Temp asked");
}

function down_temp()
{
  console.log("Down Temp asked")
}

class Thermometer extends HTMLElement
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {
    var img = "static/imgs/thermometer-profile.png";
    const address = this.getAttribute('address');
    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                     "<h5>Thermometer : " +"</h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='16'>" + "<br>" + "</a>" +
                     "<button type='button' onclick='rise_temp()' class='btn btn-success'>  +  </button>" +
                     "<button type='button' onclick='down_temp()' class='btn btn-danger'>  -  </button>" +
                     "</div></div>" ;
  }
}

customElements.define('thermometer-basic', Thermometer);

class Barometer extends HTMLElement 
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {
    var img = "static/imgs/barometer-profile.png";
    const address = this.getAttribute('address');

    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                 "<h5>Barometer : " +"</h5>" +
                 "<a href = /generic/" + address +">" +
                 "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                 "<h6> Current value : </h6>" +
                 "</div></div>" ;
  }
}

customElements.define('barometer-basic' , Barometer);

class Hygrometer extends HTMLElement 
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {
    var img = "static/imgs/hygrometer-profile.png";
    const address = this.getAttribute('address');

    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                 "<h5>Hygrometer : " +"</h5>" +
                 "<a href = /generic/" + address +">" +
                 "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                 "<h6> Current value : </h6>" +
                 "</div></div>" ;
  }
}

customElements.define('hygrometer-basic' , Hygrometer);

class Windgauge extends HTMLElement 
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {
    var img = "static/imgs/windgauge-profile.png";
    const address = this.getAttribute('address');

    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                     "<h5>Windgauge : " +"</h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "<h6> Current value : </h6>" +
                     "</div></div>" ;
  }
}

customElements.define('windgauge-basic' , Windgauge);

class Gateway extends HTMLElement 
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {
    var img = "static/imgs/gateway-profile.png";
    const address = this.getAttribute('address');

    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                     "<h5>Gateway : " +"</h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "<h6> Current value : </h6>" +
                     "</div></div>" ;
  }
}

customElements.define('gateway-basic' , Gateway);

class Hmi extends HTMLElement 
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {
    var img = "static/imgs/hmi-profile.png";
    const address = this.getAttribute('address');

    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                     "<h5>HMI : " +"</h5>" +
                     "<a href = /generic/" + address +">" +
                     "<img src=" + img + " height='50' width='50'>" + "<br>" + "</a>" +
                     "<h6> Current value : </h6>" +
                     "</div></div>" ;
  }
}

customElements.define('hmi-basic' , Hmi);