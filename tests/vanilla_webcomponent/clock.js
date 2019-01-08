export class Clock extends HTMLElement {
  constructor() 
  {
    super();
    this.update();
    setInterval(() => 
    { 
        this.update();
    },1000);
  }

  update() 
  {
    let time = new Date();
    this.innerHTML = "<b>" + this.harold(time.getHours()) + ":" +
                     this.harold(time.getMinutes()) +":" + 
                     this.harold(time.getSeconds()) + "</b>";
  }

  harold(standIn) 
  {
    if (standIn < 10) 
    {
        standIn = '0' + standIn
    }
    return standIn;
  }
}

customElements.define('x-clock',Clock);