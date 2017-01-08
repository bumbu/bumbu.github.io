---
title: A safe function to build HTML elements without using innerHTML
date: 2016-04-23T21:20:45+00:00
author: bumbu
layout: post
permalink: /a-safe-function-to-build-html-elements-without-using-innerhtml/
categories: development
---
Everyone knows that using `innerHTML` is not set. Right? React blog describes it very nicely:

> Improper use of the `innerHTML` can open you up to a cross-site scripting (XSS) attack. Sanitizing user input for display is notoriously error-prone, and failure to properly sanitize is one of the [leading causes of web vulnerabilities](https://owasptop10.googlecode.com/files/OWASP%20Top%2010%20-%202013.pdf) on the internet.

So it is really hard to make a safe `innerHTML`.

Some alternatives for using `innerHTML` are:

1. Parsing the HTML string as the browser would and creating DOM nodes based on that
1. Instead of writing HTML strings - describing nodes properties (as objects) and passing them to a builder function.

We will go with the second approach. So instead of writing:

```js
element.innerHTML = '<span class="big">Some text</span>'
```

we will do:

```js
element.innerHTML = '';
childElement = buildElement({
  tagName: 'span',
  class: 'big',
  text: 'Some text'
});
element.appendChild(childElement)
```

Or a more complex example like:

```html
<div class="col">
  <a class="parent" href="#home">
    <i class="icon-home"></i>
    Go home
  </a>
  <button>Close</button>
</div>
```

it can be written like:

```js
buildElement({
  tagName: 'div',
  'class': 'col',
  children: [{
    tagName: 'a',
    'class': 'parent',
    href: '#home',
    children: [{
      tagName: 'i',
      'class': 'icon-home'
    }, {
      tagName: 'text',
      text: 'Go home'
    }]
  }, {
    tagName: 'button',
    text: 'Close'
  }]
});
```

Pretty ugly compared to HTML version. But it does its job and the `buildElement` function is pretty straight-forward:

```js
function buildElement(obj) {
  if (obj['tagName'] === 'text') {
    return document.createTextNode(obj['text']);
  } else {
    // Create element
    var parentNode = document.createElement(obj['tagName'].toUpperCase());
    var index;

    // Set attributes
    for (index in obj) {
      if (index !== 'tagName' && index !== 'text' && index !== 'children') {
        parentNode.setAttribute(index, obj[index]);
      }
    }

    // Add children
    if ('children' in obj) {
      for (index in obj['children']) {
        parentNode.appendChild(buildElement(obj['children'][index]));
      }
    } else if ('text' in obj) {
      parentNode.appendChild(document.createTextNode(obj['text']));
    }

    return parentNode;
  }
}
```

Safe template coding!
