//########################################################################
//@NOTFOUNDDEVICE COMPONENT

class NotFoundDevice extends HTMLElement
{
  constructor()
  {
    super();
    this.render = render.bind(
      this,
      this.attachShadow({mode: 'closed'}),
      this.render
    );
  }

  connectedCallback()
  {
    if (this.hasAttribute('name')) { this.name = this.getAttribute('name'); }
    else { this.name = ''; }
    
    if (this.hasAttribute('src')) { this.src = this.getAttribute('src'); }
    else { this.src = '/static/imgs/default-image.jpeg'; }  
    
    this.update();
  }

  update()
  {
    this.render();
  }

  render()
  {
    return html`
    <style>
      div
      {
        background-color: LightGray;
        border-style: groove;
        border-radius: 5px;
        height: 140px;
        margin: 5%;
        padding: 0px;
      }
    </style>
    <div>
      <basic-title title=${this.name}></basic-title>
      <image-basic src=${this.src}></image-basic>
    </div>
    `;
  }
}

customElements.define('notfound-device', NotFoundDevice);

//########################################################################
//@BASIC DEVICE COMPONENT

class BasicDevice extends HTMLElement
{
  constructor()
  {
    super();

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
      this.value = 'No Value';
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

      image.setAttribute('src', this.src);
      image.setAttribute('height', this.height);
      image.setAttribute('width', this.width);
      image.setAttribute('address', this.address);

      style.textContent = `
      div
      {
        background-color: rgba(22, 137, 237, 1);
        border-style: groove;
        border-radius: 5px;
        height: 140px;
        margin: 5%;
        padding: 0px;
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

//########################################################################
//@ONOFFDEVICE COMPONENT

class OnOffDevice extends HTMLElement
{
  constructor() 
  {
    super();

    if (this.hasAttribute('address'))
    {
      this.address = this.getAttribute('address');
    }
    else
    {
      this.address = "No Address";
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
      var shadow  = this.attachShadow({mode : 'open'});
      var content = document.createElement('div');
      var style   = document.createElement('style');
      var bs_dev  = document.createElement('title-image');
      var buttons = document.createElement('onoff-buttons');
      var endline = document.createElement('br');

      if (this.status == 'True')
      {
        content.setAttribute('class', 'box box-on');
      }
      else
      {
        content.setAttribute('class', 'box box-off');
      }

      bs_dev.setAttribute('title', this.title);
      bs_dev.setAttribute('src', this.src);
      bs_dev.setAttribute('height', this.height);
      bs_dev.setAttribute('width', this.width);
      bs_dev.setAttribute('address', this.address);
      bs_dev.setAttribute('value', this.value);
      bs_dev.setAttribute('class', 'inside');

      buttons.setAttribute('address', this.address);

      style.textContent = `
      .box 
      {
        border-style: groove;
        border-radius: 5px;
        height: 140px;
        margin: 5%;
        padding: 0px;
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
      content.appendChild(bs_dev);
      content.appendChild(endline);
      content.appendChild(buttons);
    }
  }
}

customElements.define('onoff-device', OnOffDevice);

//########################################################################
//@UDSDEVICE COMPONENT

class UDSDevice extends HTMLElement 
{
  constructor() 
  {
    super();

    if (this.hasAttribute('address'))
    {
      this.address = this.getAttribute('address');
    }
    else
    {
      this.address = "No Address";
    }
    if (this.hasAttribute('status'))
    {
      this.status = this.getAttribute('status');
    }
    else
    {
      this.status = "No Status";
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
      this.title = 'UDSDevice';
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
      this.value = "No Value";
    }

    if (!this.shadowRoot)
    {
      var shadow  = this.attachShadow({mode : 'open'});
      var content = document.createElement('div');
      var style   = document.createElement('style');
      var bs_dev  = document.createElement('basic-device');
      var buttons = document.createElement('uds-buttons');
      var endline = document.createElement('br');

      bs_dev.setAttribute('title', this.title);
      bs_dev.setAttribute('src', this.src);
      bs_dev.setAttribute('height', this.height);
      bs_dev.setAttribute('width', this.width);
      bs_dev.setAttribute('address', this.address);
      bs_dev.setAttribute('value', this.value);
      bs_dev.setAttribute('class', 'inside');

      buttons.setAttribute('address', this.address);

      style.textContent = `
      div
      {
        background-color: rgba(22, 137, 237, 1);
        border-style: groove;
        border-radius: 5px;
        height: 140px;
        margin: 5%;
        padding: 0px;
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(content);
      content.appendChild(bs_dev);
      content.appendChild(endline);
      content.appendChild(buttons);
    }
  }
}

customElements.define('uds-device', UDSDevice);
