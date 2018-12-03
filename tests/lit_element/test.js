import {LitElement, html} from 'https://unpkg.com/@polymer/lit-element/lit-element.js?module';
    
class MyElement extends LitElement {

    static get properties() {
        return {
            mood: {type: String }
        }
    }

    render() {
        return html`<style> .mood { color: green; } </style>
        Web Components are <span class="mood">${this.mood}</span>!`;
    }
      
    }

class MyElement2 extends MyElement {
}

customElements.define('my-element', MyElement);
customElements.define('my-element2', MyElement2);
  