# anchor-scroller
⚓️ Smoothly scroll to #anchors

## Features
* ... Scrolls to anchors
* Stops scrolling if the user scrolls
* Doesn't try to scroll past the end

It doesn't sound like much but it's actually really nice 😁

## Quickstart
```shell
npm install anchor-scroller --save
```
```javascript
const AnchorScroller = require('anchor-scroller');
new AnchorScroller();
```

## Configuration

You can pass the instance an options object to tweak it's behavior. The simplest options are `class` and `checkParent`.
```javascript
new AnchorScroller({
  class: 'scroll', // will make it only react on elements with the given class.
  checkParent: true // will make it check the parent element, if the clicked element didn't match the criteria.
});
```

[The more in-depth usage guide](https://github.com/semlette/anchor-scroller/wiki/Using-Anchor-Scroller) also has documentation on all [options](https://github.com/semlette/anchor-scroller/wiki/Using-Anchor-Scroller#options) and [methods](https://github.com/semlette/anchor-scroller/wiki/Using-Anchor-Scroller#methods).
