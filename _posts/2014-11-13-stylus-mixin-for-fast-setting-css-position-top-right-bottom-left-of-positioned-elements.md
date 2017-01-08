---
title: Stylus mixin for fast setting CSS position (top, right, bottom, left) of positioned elements
date: 2014-11-13T10:37:07+00:00
author: bumbu
layout: post
permalink: /stylus-mixin-for-fast-setting-css-position-top-right-bottom-left-of-positioned-elements/
categories: development
---
If you have a absolute or fixed positioned element you have to set at least one of top, right, bottom or left properties. Otherwise positioning may not work or may behave unexpectedly. Very often there is a need in setting almost all or all of these properties. You may have fun writing:
<pre class="prettyprint lang-css"><code>top: 0;
right: 0;
bottom: 0;
left: 0;
</code></pre>
but it feels that it could done better and faster. For example the same way as it is done for margin or padding: you can specify any number of arguments from one to four and they will mean different things:
<pre class="prettyprint lang-css"><code>padding: 1px; /* all sides will have 1px padding */
padding: 1px 2px; /* padding-top and padding-bottom are 1px, padding-left and padding-right are 2px */
padding: 1px 2px 3px; /* padding-top is 1px, padding-bottom is 3px, padding-left and padding-right are 2px */
padding: 1px 2px 3px 4pxx; /* padding-top is 1px, padding-right is 2px, padding-bottom is 3px and padding-left is 4px */</code></pre>
We can use the same level of verbosity for top, right, bottom and left properties. Lets define a mixin like this (trbl stands for <strong>t</strong>op<strong>r</strong>ight<strong>b</strong>ottom<strong>l</strong>eft):
<pre class="prettyprint lang-stylus"><code>trbl(t, args...)
  // Top
  top t

  // Right
  if length(args) &gt; 0
    right args[0]
  else
    right t

  // Bottom
  if length(args) &gt; 1
    bottom args[1]
  else
    bottom t

  // Left
  if length(args) &gt; 2
    left args[2]
  else if length(args) &gt; 0
    left args[0]
  else
    left t</code></pre>
Now it is easy to use it. Here are some examples:
<pre class="prettyprint lang-css"><code>trbl: 0;
/* Similar to */
top: 0;
right: 0;
left: 0;
bottom: 0;

trbl: 1px 2px;
/* Similar to */
top: 1px;
right: 2px;
bottom: 1px;
left: 2px;

trbl: 1px 2px 3px;
/* Similar to*/
top: 1px;
right: 2px;
bottom: 3px;
left: 2px;

trbl: 1px 2px 3px 4px;
/* Similar to */
top: 1px;
right: 2px;
bottom: 3px;
left: 4px;
</code></pre>

And if you need all properties except top set to some value you can do:
<pre class="prettyprint lang-css"><code>trbl: auto 2px 3px 4px;</code></pre>
This way top property will stay default and you'll get only those properties that you need.
