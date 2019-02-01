class testClass extends HTMLElement
{
  constructor()
  {
    super();
    this.render();
  }

  render()
  {
    this.innerHTML = "<div id='toto'>toto</div>";
  }
}

customElements.define('test-class', testClass);

class testInherit extends HTMLElement
{
  constructor()
  {
    super();
    this.render();
  }

  render()
  {
    this.innerHTML = "<test-class></test-class>";
  }
}

customElements.define('test-inherit', testInherit);