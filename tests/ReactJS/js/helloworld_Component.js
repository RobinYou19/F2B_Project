function HelloWorldComponent()
{
  return React.createElement('p', {}, 'Hello World !');
}

ReactDOM.render(
  React.createElement(HelloWorldComponent),
  document.getElementById('hello-world')
);