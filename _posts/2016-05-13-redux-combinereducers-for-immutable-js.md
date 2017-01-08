---
title: Redux combineReducers for Immutable.js
date: 2016-05-13T08:57:44+00:00
author: bumbu
layout: post
permalink: /redux-combinereducers-for-immutable-js/
categories: development
---
Let's say that you use Immutable.js Map as a data-structure of your state and you have following reducers:

```js
import { Map } from 'immutable'

const initialState = Map({})

const reducers = Map({
  'current': currentReducer,
	'items': itemsReducer,
	'offices': officesReducer,
})
```

Default `combineReducers` function that comes with Redux will not work as it doesn't know how to read and create new versions of state.

But it is easy to write you own `combineReducers` for Immutable.js:

```js
const combineReducers = function(state = initialState, action) {
  reducers.forEach((reducer, key) => {
    state = state.set(key, reducer(state.get(key), action))
  })

  return state
}
```

on in a more readable way:

```js
const combineReducers = function(state = initialState, action) {
  reducers.forEach((reducer, key) => {
    var oldState = state.get(key)
    var newState = reducer(oldState, action)
    state = state.set(key, newState)
  })

  return state
}
```

## Reducers that get entire state instead of a single attribute

If for some reason you need a reducer to get entire state as an attribute then it's easy to do with a simple convention: is a reducer name starts with an asterisk `*` then that reducer will receive entire state as first argument:

```js
const reducers = Map({
  '*all': everythingReducer, // <== this reducer will receive entire state as first argument
	'items': itemsReducer,
	'offices': officesReducer,
})
```

and the `combineReducers` for that is:

```js
const combineReducers = function(state = initialState, action) {
  reducers.forEach((reducer, key) => {
    // If reducer key starts with * then pass entire state to reducer
    var oldState = key[0] === '*' ? state : state.get(key)
    var newState = reducer(oldState, action)
    if (key[0] === '*') {
      state = newState
    } else {
      state = state.set(key, newState)
    }
  })

  return state
}
```

But this is an antipattern. I was using this function initially as I thought that I need it so that an action could change multiple attributes of state. But there is a better way.

## Same action can change multiple state attributes

If you have an action (say `CHANGE_CURRENT_PAGE`) that should modify multiple state top-level attributes (say `sidebarShown` and `currentPage`) then you're much better off by checking for the same action in 2 separate reducers. This way each reducer will be responsible for it's own part of the state.
