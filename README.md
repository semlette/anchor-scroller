# anchor-scroller
⚓️ Smoothly scroll to #anchors

## Features
* ... Scrolls to anchors
* Stops scrolling if the user scrolls
* Doesn't try to scroll past the end
* It's only 3kb in size (1kb gzipped)
* Uses `requestAnimationFrame` for smooth animation

## Quickstart

### Node with a module bundler
```shell
npm install anchor-scroller --save
```
```javascript
const AnchorScroller = require("anchor-scroller");
new AnchorScroller();
```

### Browser
```html
<script src="https://unpkg.com/anchor-scroller@1.2.1/distribution/AnchorScroller.js"></script>
<script>new AnchorScroller()</script>
```

[Check out the wiki for more info.](https://github.com/semlette/anchor-scroller/wiki)

## Configuration

You can pass the instance an options object to tweak it's behavior. The simplest options are `class` and `checkParent`.
```javascript
new AnchorScroller({
  "class": "scroll", // will make it only react on elements with a "scroll" class.
  checkParent: true // will make it check the parent element, if the clicked element didn't match the criteria.
});
```

[The more in-depth usage guide](https://github.com/semlette/anchor-scroller/wiki/Using-Anchor-Scroller) also has documentation on all [options](https://github.com/semlette/anchor-scroller/wiki/Using-Anchor-Scroller#options) and [methods](https://github.com/semlette/anchor-scroller/wiki/Using-Anchor-Scroller#methods).
