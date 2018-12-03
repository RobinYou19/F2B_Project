


Slim.tag(
  'my-tag',
  `<div>Hello, i am a custom element {{value}}</div>`,

  class MyTag extends Slim {
    onAdded () {
        this.value = "sddsfsd"
        console.log('Added' + this)
    }
  }
)
