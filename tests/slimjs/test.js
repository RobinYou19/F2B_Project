Slim.tag(
  'my-tag',
  `<div>Hello, i am a custom element named {{value}}</div>`,

  class MyTag extends Slim {
    onAdded () {
        this.value = "Bonjour Robin"
        console.log('Added' + this)
    }
  }
)
