---
title: Comparing numbers approximately in QunitJS
date: 2014-09-22T12:48:24+00:00
author: bumbu
layout: post
permalink: /comparing-numbers-approximately-in-qunitjs/
categories: development
---
JS is prone to floating point errors. A classical example is:
<code>0.1 + 0.2 = 0.30000000000000004</code>
Often when it comes to testing you want to check if resulting numbers are pretty close. You can simply do it in QunitJS by defining a new assertion as follows:
<pre class="language-js"><code>/**
 * Compare numbers taking in account an error
 *
 * @param  {Float} number
 * @param  {Float} expected
 * @param  {Float} error    Optional
 * @param  {String} message  Optional
 */
QUnit.assert.close = function(number, expected, error, message) {
  if (error === void 0 || error === null) {
    error = 0.00001 // default error
  }

  var result = number == expected || (number &lt; expected + error &amp;&amp; number &gt; expected - error) || false

  QUnit.push(result, number, expected, message);
}</code></pre>
Now instead of <code>assert.equal(0.1 + 0.2, 0.3)</code> you should do <code>assert.close(0.1 + 0.2, 0.3)</code> and your test will pass. If you want to control the precision then you pass as third argument max error value.

You may check out <a href="https://github.com/JamesMGreene/qunit-assert-close" target="_blank">this library</a> that has the same method and few more.
