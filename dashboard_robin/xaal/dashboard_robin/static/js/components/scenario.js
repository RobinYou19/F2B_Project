//########################################################################
//@SCENARIO COMPONENT

class Scenario extends HTMLElement
{
  constructor()
  {
    super();
  }

  connectedCallback()
  {
    if (this.hasAttribute('address_list'))
    {
      this.address_list = this.getAttribute('address_list');
    }
    else
    {
      this.address_list = [];
    }
    if (this.hasAttribute('actions_list'))
    {
      this.actions_list = this.getAttribute('actions_list');
    }
    else
    {
      this.actions_list = [];
    }
    if (!this.shadowRoot)
    {
      var shadow  = this.attachShadow({mode : 'open'});
      var button  = document.createElement('button');
      var style   = document.createElement('style');

      var array_address = this.address_list.split('###');
      var array_actions = this.actions_list.split('###');

      button.innerHTML = "DO IT !";
      button.setAttribute('class', 'button action_button');

      button.addEventListener('click', function()
      {
        if(array_address.length = array_actions.length)
        {
          for (var i = 0; i<(array_address.length -1); i++)
          {
            sio_send_request(array_address[i], array_actions[i], {});
            console.log(array_actions[i] + "sended to " + array_address[i]);
          }
        }
      });

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

      .action_button
      {
        background-color: rgb(28, 184, 65);
        padding: 5px 14px;
      }

      .action_button:hover 
      {
        background-color: #3e8e41
      }
      `;

      shadow.appendChild(style);
      shadow.appendChild(button);
    }
  }
}

customElements.define('basic-scenario', Scenario);
