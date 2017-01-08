---
title: Simple MobX
date: 2016-10-03T12:35:14+00:00
author: bumbu
layout: post
permalink: /simple-mobx/
categories: development
---
This is a post that tries to explain the the basics of MobX. We'll build a minimal working example with MobX. If you're looking for proper MobX documentation then check [official docs](https://mobxjs.github.io/mobx/).

### What is MobX

From documentation: Simple, scalable state management. Basically MobX is meant to handle and organize application state/data while being simple and scalable. Which it does pretty well. Let's take a look at the diagram:

<img src="{{site.root}}/assets/images/2016/10/mobx-diagram-300x144.png" alt="mobx-diagram" width="300" height="144" class="alignnone size-medium wp-image-1036" />

Let's go through each diagram step by step and build a simple application.

### State

<img src="{{site.root}}/assets/images/2016/10/mobx-store-150x150.png" alt="mobx-store" width="150" height="150" class="alignright size-thumbnail wp-image-1040" />In MobX you can have one or multiple states' storages. Let's go with one:

```js
var store = mobx.observable({
    counter: 0
})
```

We initialize our store with just one state data - `counter`. Your object may be multi-level with multiple different attributes.

### Rendering

<img src="{{site.root}}/assets/images/2016/10/mobx-render-300x139.png" alt="mobx-render" width="300" height="139" class="alignright size-medium wp-image-1039" />MobX plays really well with React.js, but it may be used virtually with any renderer. Let's use some plain JS:

```html
<div id="counter">-</div>
```

```js
function render(state) {
    document.getElementById('counter').textContent = state.counter;
}
```

Here we get the state and use it to update the view.

### Actions

<img src="{{site.root}}/assets/images/2016/10/mobx-action-300x138.png" alt="mobx-action" width="300" height="138" class="alignright size-medium wp-image-1038" />We can directly change the state whan an action happens:

```html
<button id="button">Increment</button>
```

```js
document.getElementById('button').addEventListener('click', function() {
    store.counter = store.counter + 1
})
```

Here when we click the button, we increment the state's counter.

### State change

When state changes, we update our render:

```js
mobx.observe(store, function() {
    render(store)
})
```

### Final result

<iframe width="100%" height="300" src="//jsfiddle.net/bumbu/n1zjr1vw/embedded/js,html,resources,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


### Comparison to Redux

MobX seems to be much simpler to write and reason about then the Redux. You write much less boilerplate than in Redux. But this comes at a cost of not knowing what exactly is happening inside of MobX. MobX code may be written in the same way as Redux code: with actions, action creators, async action creators... but it's not mandatory. Over all it seems to be a great choise as long as you keep your code modular, tested and the flow unidirectional.

[Here is a post about simple Redux](/simple-redux/ ).
