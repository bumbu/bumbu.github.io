---
title: base64 encoder for node-sass
date: 2016-10-02T10:58:21+00:00
author: bumbu
layout: post
permalink: /base64-encoder-for-node-sass/
categories: development
---
Adding a base64 encoder function to node-sass is pretty straight-forward.
We'll have to define a `encodeBase64` function and pass it to sass compiler.

If you're using gulp than it will look something like this:

```js|hl=5-12
var gulp = require('gulp');
var sass = require('gulp-sass');
var nodeSass = require('node-sass');

var sassOptions = {
   functions: {
     'encodeBase64($string)': function($string) {
       var buffer = new Buffer($string.getValue());
       return nodeSass.types.String(buffer.toString('base64'));
     }
   }
}

gulp.src(source)
  .pipe(sass(sassOptions))
  .pipe(destination)
)
```

The main bit here are lines 5-12 were we define options for SASS compiler. In SASS that can be used as

```scss
.facebook-icon {
  $encodedSvg: encodeBase64('<svg><path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" /></svg>');
  background-image: url('data:image/svg+xml;base64,#{$encodedSvg}');
}
```

If you're looking for a way to inline your images (svg, png, jpg...) into SASS then take a look at [JosephClay/sass-inline-image](https://github.com/JosephClay/sass-inline-image).
