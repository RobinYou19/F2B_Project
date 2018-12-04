
const MyTag = xtag.create(
    'my-tag', 
    class extends XTagElement {
        'click::event' (){
            console.log('click::event' + this);
        }

        name (){ return 'Frankenstein'; }

        '::template(true)' (){
            return `<h2>I am ${this.name()}</h2>
            <span>I was created by a mad scientist</span>`
        }
});


const MyTag2 = xtag.create(
    'my-tag2', 
    class extends MyTag {

        connectedCallback () {
            this.innerHTML = `<b>${this.name()}<b>`;
        }


  });

