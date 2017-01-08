---
title: SVG circle with multicolor stroke
date: 2014-08-27T12:21:46+00:00
author: bumbu
layout: post
permalink: /svg-circle-with-multicolor-stroke/
categories: development experiments
---
At some point you may want to have an object (circle, rectangle, line etc.) that has a multicolor stroke (border).

By now SVG does not have such option but we can take advantage of another feature: <em>stroke-dasharray</em>. This CSS attribute allows to create dashed stroke with specified dash width and distance between dashes. By overlapping objects with different strokes we can achieve multicolor stroke.

Lets say we want a circle with 3-color stroke: yellow, red and blue. Let the dash width be 10px. First we create a circle with normal yellow stroke.
<pre class="language-html"><code>&lt;svg xmlns="http://www.w3.org/2000/svg" height="220"&gt;
    &lt;circle class="stroke-yellow" cy="110" cx="110" r="100"&gt;&lt;/circle&gt;
&lt;/svg&gt;</code></pre>
<pre class="language-css"><code>circle {
  stroke-width: 3;
  stroke-opacity: 1;
  fill: none;
}

circle.stroke-yellow {
  stroke: yellow;
}</code></pre>
This way we get a circle with yellow stroke

<a href="http://bumbu.me/wp-content/uploads/2014/08/multicolor-one.png"><img class="size-full wp-image-497 alignnone" alt="multicolor-one" src="http://bumbu.me/wp-content/uploads/2014/08/multicolor-one.png" width="214" height="212" /></a>

Next step is to add second layer of color (red):
<pre class="language-html"><code>&lt;svg xmlns="http://www.w3.org/2000/svg" height="220"&gt;
    &lt;circle class="stroke-yellow" cy="110" cx="110" r="100"&gt;&lt;/circle&gt;
    &lt;circle class="stroke-red" cy="110" cx="110" r="100"&gt;&lt;/circle&gt;
&lt;/svg&gt;</code></pre>
<pre class="language-css"><code>circle {
  stroke-width: 3;
  stroke-opacity: 1;
  fill: none;
}

circle.stroke-yellow {
  stroke: yellow;
}

circle.stroke-red {
  stroke: red;
  stroke-dasharray: 20,10;
}</code></pre>
Now red color is dominating.

<a href="http://bumbu.me/wp-content/uploads/2014/08/multicolor-two.png"><img class="size-full wp-image-499 alignnone" alt="multicolor-two" src="http://bumbu.me/wp-content/uploads/2014/08/multicolor-two.png" width="213" height="215" /></a>

The last step is to cover half of red color with blue:
<pre class="language-html"><code>&lt;svg xmlns="http://www.w3.org/2000/svg" height="220"&gt;
    &lt;circle class="stroke-yellow" cy="110" cx="110" r="100"&gt;&lt;/circle&gt;
    &lt;circle class="stroke-red" cy="110" cx="110" r="100"&gt;&lt;/circle&gt;
    &lt;circle class="stroke-blue" cy="110" cx="110" r="100"&gt;&lt;/circle&gt;
&lt;/svg&gt;</code></pre>
<pre class="language-css"><code>circle {
  stroke-width: 3;
  stroke-opacity: 1;
  fill: none;
}

circle.stroke-yellow {
  stroke: yellow;
}

circle.stroke-red {
  stroke: red;
  stroke-dasharray: 20,10;
}

circle.stroke-blue {
  stroke: blue;
  stroke-dasharray: 10,20;
}</code></pre>
This way we got a circle with multicolor stroke.

<a href="http://bumbu.me/wp-content/uploads/2014/08/multicolor-three.png"><img class="size-full wp-image-498 alignnone" alt="multicolor-three" src="http://bumbu.me/wp-content/uploads/2014/08/multicolor-three.png" width="216" height="212" /></a>

There are 2 things to take in account:
<ul>
	<li>Start with lighter colors. Dark colors should be added in the end. This is because objects may have smooth borders and some light pieces may end up with dark borders</li>
	<li>In order to find out necessary stroke dasharray values do:
<ul>
	<li>Decide on dash width (be it X)</li>
	<li>Let C be the number of colors</li>
	<li>First circle should not have dasharray attribute</li>
	<li>Second circle will have dasharray attribute set as (C-1)*X,1*X</li>
	<li>Third circle will have dasharray attribute set as (C-2)*X,2*X</li>
	<li>and so on up to last circle</li>
</ul>
</li>
</ul>
[caption id="attachment_501" align="alignnone" width="210"]<a href="http://bumbu.me/wp-content/uploads/2014/08/multicolor-circle.png"><img class="size-full wp-image-501 " alt="multicolor-circle" src="http://bumbu.me/wp-content/uploads/2014/08/multicolor-circle.png" width="210" height="211" /></a> Circle with multicolor stroke. Some stroke dashes seem to be bordered by darker colors (ex. yellow)[/caption]
