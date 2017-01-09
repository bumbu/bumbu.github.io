---
title: Simple rule of thumb for semicolon-less JavaScript
date: 2015-12-20T20:33:10+00:00
author: bumbu
layout: post
permalink: /simple-rule-of-thumb-for-semicolon-less-javascript/
categories: blog development
---
A very easy rule of thumb where semicolons are necessary and allows you not to add semicolons at the end of all statements:

* In for loops: `for(var i = 0; i &lt; 10; i++){}`
* In a body-less loop: `while(i === 0);`
* If a line starts with any of these characters:
	*	`(` _example `;(function(){})()`_
	* `[`
	* `+`
	* `-`

You anyway have to add these semicolons because when your files will get concatenated/minified these statements may be right after a library that doesn't use semicolons.

### Never break lines for
There are only few cases where line-breaking does not concatenate statements (applies to both _semicolon-everything_ and _semicolon-less_ approach):

* `return`
* `break`
* `continue`
* `throw`
