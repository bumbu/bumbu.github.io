---
title: Simple Redux
date: 2016-10-03T12:34:10+00:00
author: bumbu
layout: post
permalink: /simple-redux/
categories: development learning
---
This is a post that tries to explain the the basics of Redux. We'll build a minimal working example with Redux. If you're looking for proper Redux documentation then check [official docs](http://redux.js.org/).

### What is Redux

From the official docs - Redux is a predictable state container for JavaScript. In other words Redux is meant to handle and organize application state/data.

Here is a diagram that often is confusing when you see it first time:

![Redux diagram](https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966)
_more diagrams [here](https://github.com/reactjs/redux/issues/653)_

So let's go step by step and see what that diagram means.

### State

<img src="http://bumbu.me/wp-content/uploads/2016/10/redux-state.png" alt="redux-state" width="130" height="41" class="alignright size-full wp-image-1027" />Any application has a state. Some store their state in a database, some store their state in multiple places. In Redux you store the state in a single object. It knows which page is curently open, a set of items, current user and so on. It may be normalized or denormalized, but it should know enough so that you can save the state (say as JSON) and when loaded in a different browser - it will render the same app (same page, same items, same user...).

Let's define our state for a counter app:

```js
var initialState = {counter: 0}
```

### Rendering

<img src="http://bumbu.me/wp-content/uploads/2016/10/redux-render-300x78.png" alt="redux-render" width="300" height="78" class="alignright size-medium wp-image-1026" />Redux works very well with React.js, but it can be rendered with anything else. We'll render the state using plain JS:

```html
<div id="counter">-</div>
```

```js
function render(state) {
  document.getElementById('counter').textContent = state.counter;
}
```

### Actions

<img src="http://bumbu.me/wp-content/uploads/2016/10/redux-action-300x138.png" alt="redux-action" width="300" height="138" class="alignright size-medium wp-image-1024" />If application state changes, that's because of actions. They could be user actions, asynchronous actions, scheduled actions and so on. We'll define a button that will trigger an action.

```html
<button id="button">Increment</button>
```

```js
document.getElementById('button').addEventListener('click', incrementCounter)
```

### Store and reducer

<img src="http://bumbu.me/wp-content/uploads/2016/10/redux-store-300x130.png" alt="redux-store" width="300" height="130" class="alignright size-medium wp-image-1028" />Actions don't change the state directly. A Redux store is responsible for that:

```js|hl=1,4
var store = Redux.createStore(reducer, initialState)

function incrementCounter() {
  store.dispatch({
    type: 'INCREMENT'
  })
}
```

<img src="http://bumbu.me/wp-content/uploads/2016/10/redux-reducer-300x131.png" alt="redux-reducer" width="300" height="131" class="alignright size-medium wp-image-1025" />The Redux store holds the current state, and reacts to actions. When an action is dispatched (line 4), the store updates the state by passing current state and current action to the reducer, and the state is updated with what the reducer returned:

```js
function reducer(state, action) {
  if (action.type === 'INCREMENT') {
    state = Object.assign({}, state, {counter: state.counter + 1})
  }
  return state
}
```

### State change

When state changes, renderer updates the render:

```js
store.subscribe(function() {
  render(store.getState())
})
```

A React.js renderer is perfect in that case as it updates only what changed (and not everything as we just did).

### First render

As the render will not happen until an action will be dispatched, let's trigger the very first render straight away:

```js
render(store.getState())
```

### Final result

<iframe width="100%" height="300" src="//jsfiddle.net/bumbu/qt02zL0g/embedded/js,html,resources,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Hopefully now the diagram makes sense!

### Comparison with MobX

In Redux you control everything: actions, action creators, state update and so on. That means that every piece of application can be predictably tested. But that leads to a lot of boilerplate. On the other hand MobX serves a similar purpose, but hides some actions from the user. So you write less code.

Still, Redux is a more mature, and allows some nice features like server-side rendering and very nice development tools.

[Here is a post about simple Redux](/simple-mobx/).
