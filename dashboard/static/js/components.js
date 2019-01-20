/* Tried to decrease as much as possible the dependencies on JS libraries (like jQuery)
*/
window.onload = function() {
			  tick();
};

function tick(){
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

function turn_on()
{
  console.log("on request sended");
}

function turn_off()
{
  console.log("off request sended");
}

class Lamp extends HTMLElement 
{
  constructor()
  {
    super();
    this.update();
  }

  update()
  {

    const address = this.getAttribute('address');
    const light = this.getAttribute('light');

    console.log(light);

    var img1 = "/static/imgs/light-on.svg";
    var img2 = "/static/imgs/light-off.svg";

    if (light == "ON")
    {
      this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                        "Address : " + address + "<br>" + 
                        "<a href = /generic/" + address +">" +
                        "<img src=" + img1 + ">" + "<br>" + "</a>" +
                        "<button type='button' onclick='turn_on()' class='btn btn-success'>  ON  </button>" +
                        "<button type='button' onclick='turn_off()' class='btn btn-danger'>  OFF  </button>" +
                        "</div></div>" ;
    }
    else 
    {
      this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                        "Address : " + address + "<br>" + 
                        "<a href = /generic/" + address +">" +
                        "<img src=" + img2 + ">" + "<br>" + "</a>" +
                        "<button type='button' onclick='turn_on()' class='btn btn-success'>  ON  </button>" +
                        "<button type='button' onclick='turn_off()' class='btn btn-danger'>  OFF  </button>" +
                        "</div></div>" ;
    }
  }
}

customElements.define('lamp-basic', Lamp);