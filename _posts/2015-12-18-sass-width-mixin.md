---
title: SASS width mixin
date: 2015-12-18T16:46:21+00:00
author: bumbu
layout: post
permalink: /sass-width-mixin/
categories: development
---
A SASS size mixin that allows setting `width` and `height` CSS attributes:

```scss
@mixin size($width, $height...) {
  @if length($height) == 1 {
    height: $height;
    width: $width;
  } @else {
    height: $width;
    width: $width;
  }
}
```

It can be used by passing just one argument for both width and height, or 2 separate arguments:

```scss
@include size(10px, 20px);
// Compiles to
width: 10px;
height: 20px;

@include size(25px);
// Compiles to
width: 25px;
height: 25px;
```
