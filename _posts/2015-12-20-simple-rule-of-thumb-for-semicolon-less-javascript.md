---
title: Simple rule of thumb for semicolon-less JavaScript
date: 2015-12-20T20:33:10+00:00
author: bumbu
layout: post
permalink: /simple-rule-of-thumb-for-semicolon-less-javascript/
categories: blog development
---
A very easy rule of thumb where semicolons are necessary and allows you not to add semicolons at the end of all statements.
<ul>
	<li>In for loops: <code>for(var i = 0; i &lt; 10; i++){}</code></li>
	<li>In a body-less loop: <code>while(i === 0);</code></li>
	<li>If a line starts with any of these characters:
<ul>
	<li><code>(</code>
example <code>;(function(){})()</code></li>
	<li><code>[</code></li>
	<li><code>+</code></li>
	<li><code>-</code></li>
</ul>
</li>
</ul>
You anyway have to add these semicolons because when your files will get concatenated/minified these statements may be right after a library that doesn't use semicolons.
<h4>Never break lines for</h4>
There are only few cases where line-breaking does not concatenate statements (applies to both semicolon-everything and semicolon-less approach):
<ul>
	<li><code>return</code></li>
	<li><code>break</code></li>
	<li><code>continue</code></li>
	<li><code>throw</code></li>
</ul>
