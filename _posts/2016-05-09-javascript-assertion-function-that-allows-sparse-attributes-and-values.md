---
title: JavaScript assertion function that allows sparse attributes and values
date: 2016-05-09T20:54:40+00:00
author: bumbu
layout: post
permalink: /javascript-assertion-function-that-allows-sparse-attributes-and-values/
categories: development
---
Most JavaScript assertion libraries allow you to compare if objects are [equal](https://github.com/mjackson/expect#toequal), if they [match](https://github.com/mjackson/expect#tomatch) or if [one includes the other](https://github.com/mjackson/expect#toinclude). But sometimes you don't wont to compare in all the objects properties math or if all array items match. Say you want to test for the array of objects

```js
let actual = [{
  type: FETCH_ORDERS,
  status: 'before',
  payload: {},
}, {
  type: FETCH_ORDERS,
  status: 'success',
  payload: {
    entities: {
      items: [{
        key: 1,
        value: 1
      }, {
        key: 2,
        value: 2
      }],
      menus: [{
        id: 'pret',
        name: 'Pret'
      }, {
        id: 'leon',
        name: 'Leon'
      }]
    },
    result: ['pret', 'leon']
  }
}]
```

when in fact you're only interested only in

```js
[{
  type: FETCH_ORDERS,
  status: 'before',
  payload: {},
}, {
  type: FETCH_ORDERS,
  status: 'success',
  payload: ...
}]
```

For example if using [mjackson/expect](https://github.com/mjackson/expect) library you can check for that by doing:

```js
let asserted = [{
  type: FETCH_ORDERS,
  status: 'before',
  payload: {},
}, {
  type: FETCH_ORDERS,
  status: 'success'
}]

expect(actual.length).toEqual(2)
expect(actual[0]).toEqual(asserted[0])
// Dont compare the payload
expect(actual[1]).toInclude(asserted[1])
// Check if the key is present
expect(actual[1]).toIncludeKey('payload')
```
{: data-line="10-15"}

## Asserting sparse attributes and values by using a placeholder

Our goal is to achieve testing by specifing which values can be anything as long as they are present:

```js
let asserted = [{
  type: FETCH_ORDERS,
  status: 'before',
  payload: {},
}, {
  type: FETCH_ORDERS,
  status: 'success',
  payload: Any
}]

expectLooseEquality(actual, asserted)
```
{: data-line="8,11"}

You can see that we marked the `payload` as a mandatory attribute which can have any value. That's our placeholder. If we don't care what the 2nd object should be then we can write the `asserted` value as:

```js
let asserted = [{
  type: FETCH_ORDERS,
  status: 'before',
  payload: {},
}, Any]
```
{: data-line="5"}

and it should pass the assertion.

## Assertion function that allows sparse attributes and values

The whole code for the assertion is:

```js
import expect from 'expect'

export const Any = Symbol('Any')

export function expectLooseEquality(assert, actual) {
  expect.assert(compare(assert, actual), 'Expected %s to equal %s', assert, actual)
}

function compare(assert, actual) {
  if (actual === Any || assert === Any || actual === assert) {
    return true
  } else if (typeof assert === 'string') {
    return assert === actual
  } else if (isArray(assert) && isArray(actual)) {
    return compareArrays(assert, actual)
  } else if (isObject(assert) && isObject(actual)) {
    return compareObjects(assert, actual) && compareObjects(actual, assert)
  }
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

function isObject(obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
}

function compareArrays(assert, actual) {
  if (assert.length !== actual.length) {
    return false
  } else {
    let allEqual = true

    for (let i = 0; i < assert.length; i++) {
      if (!compare(assert[i], actual[i])) {
        allEqual = false
        break
      }
    }

    return allEqual
  }
}

function compareObjects(assert, actual) {
  let allEqual = true

  for (let key in assert) {
    if (assert.hasOwnProperty(key)) {
      if (!compare(assert[key], actual[key])) {
        allEqual = false
        break
      }
    }
  }

  return allEqual
}
```
{:data-line="3,5"}

We define `Any` (line 3) as a symbol so that it will be unique (a plain object would work as well). Then we use this symbol whenever we need the attribute to be present but don't care about its value.

Then we use `expectLooseEquality` (line 5) to make the assertion. It's not the same syntax as `expect` provides, but it uses its `assert` method so it hooks nicely into the library.

This way you can save few lines of code and drastically improve tests readability.
