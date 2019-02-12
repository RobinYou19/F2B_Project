class LampDimmer extends OnOffDevice
{
  // Specify observed attributes so that
  // attributeChangedCallback will work
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
  // Specify observed attributes so that
  // attributeChangedCallback will work
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