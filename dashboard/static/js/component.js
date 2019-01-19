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

  var img1 = "/static/imgs/light-on.svg";
  var img2 = "/static/imgs/light-off.svg";

  if (light == "ON")
  {
    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                      "<img src=" + img1 + ">" + "</div></div>"
  }
  else 
  {
    this.innerHTML = "<div class='col-sm-3'><div class='draggable'>" +
                      "<img src=" + img2 + ">" + "</div></div>"    
  }
  
  }
}

customElements.define('lamp-basic', Lamp);