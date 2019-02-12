class LampDimmer extends OnOffDevice
{
  static get observedAttributes() 
  {
    return ['status'];
  }

  constructor()
  {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue)
  {
    const shadow = this.shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    var elem = childNodes[1];
    
    if (newValue == "true" || newValue == "True")
    {
      elem.setAttribute('class', 'box box-on');
    }
    else
    {
      elem.setAttribute('class', 'box box-off');
    }
  }
}

customElements.define('lamp-dimmer', LampDimmer);

class PowerRelay extends OnOffDevice
{
  static get observedAttributes() 
  {
    return ['status'];
  }

  constructor()
  {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue)
  {
    const shadow = this.shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    var elem = childNodes[1];
    
    if (newValue == "true" || newValue == "True")
    {
      elem.setAttribute('class', 'box box-on');
    }
    else
    {
      elem.setAttribute('class', 'box box-off');
    }
  }
}

customElements.define('powerrelay-basic', PowerRelay);

class Thermometer extends BasicDevice
{
  static get observedAttributes()
  {
    return ['value'];
  }

  constructor()
  {
    super();
  }
  attributeChangedCallback(name, oldValue, newValue)
  {
    const shadow = this.shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    var basic = childNodes[1];
    const titleNodes = Array.from(basic.childNodes);
    var title = titleNodes[0];
    title.setAttribute('value', newValue);
  }
}

customElements.define('thermometer-basic', Thermometer);

class Hygrometer extends BasicDevice
{
  static get observedAttributes()
  {
    return ['value'];
  }

  constructor()
  {
    super();
  }
  attributeChangedCallback(name, oldValue, newValue)
  {
    const shadow = this.shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    var basic = childNodes[1];
    const titleNodes = Array.from(basic.childNodes);
    var title = titleNodes[0];
    title.setAttribute('value', newValue);
  }
}

customElements.define('hygrometer-basic', Hygrometer);

class Barometer extends BasicDevice
{
  static get observedAttributes()
  {
    return ['value'];
  }

  constructor()
  {
    super();
  }
  attributeChangedCallback(name, oldValue, newValue)
  {
    const shadow = this.shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    var basic = childNodes[1];
    const titleNodes = Array.from(basic.childNodes);
    var title = titleNodes[0];
    title.setAttribute('value', newValue);
  }
}

customElements.define('barometer-basic', Barometer);

class Windgauge extends BasicDevice
{
  static get observedAttributes()
  {
    return ['value'];
  }

  constructor()
  {
    super();
  }
  attributeChangedCallback(name, oldValue, newValue)
  {
    const shadow = this.shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    var basic = childNodes[1];
    const titleNodes = Array.from(basic.childNodes);
    var title = titleNodes[0];
    title.setAttribute('value', newValue);
  }
}

customElements.define('windgauge-basic', Windgauge);

class Gateway extends BasicDevice
{
  constructor()
  {
    super();
  }
}

customElements.define('gateway-basic', Gateway);

class HMI extends BasicDevice
{
  constructor()
  {
    super();
  }
}

customElements.define('hmi-basic', HMI);