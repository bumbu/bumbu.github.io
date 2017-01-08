---
title: JavaScript Chain of Responsibility pattern with Promises
date: 2015-11-28T21:25:17+00:00
author: bumbu
layout: post
permalink: /javascript-chain-of-responsibility-pattern-with-promises/
categories: learning
---
Chain of Responsibility is a handy pattern for having multiple entities that could resolve a certain task. These entities get a chance to resolve the task one by one until one of them does that (or all fail).
<h2>Definition</h2>
<blockquote>Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it. There is a potentially variable number of "handler" objects and a stream of requests that must be handled. Need to efficiently process the requests without hard-wiring handler relationships and precedence, or request-to-handler mappings.</blockquote>
Let's go with an example. Let's say that your application displays youtube videos. Initially you have only the video ID. Your Chain of Responsibility is composed from:
<ul>
	<li>Application cache (a plain JS Object)</li>
	<li>Browser cache</li>
	<li>Your server cache (you want to save on bills)</li>
	<li>YouTube API (last resort)</li>
</ul>
One important thing to take into account is that some requests may be asynchronous (the last 2). So we have to use callbacks or Promises. Actually using Promises we'll be able to handle rejections and errors.
<pre class="prettyprint"><code>function step1() {
  return new Promise(function(resolve, reject) {
    console.log('step1')
    // setTimeout(resolve, 1000)
    setTimeout(reject, 1000)
  })
}

function step2() {
  return new Promise(function(resolve, reject) {
    console.log('step2')
    // setTimeout(resolve, 1000)
    setTimeout(reject, 1000)
  })
}

function step3() {
  return new Promise(function(resolve, reject) {
    console.log('step3')
    setTimeout(resolve, 1000) // We don't pass data into resolve to make this example simpler
    // setTimeout(reject, 1000)
  })
}

step1()
  .catch(step2)
  .catch(step3)
  .then(function(){
    console.log('done')
  })
  .catch(function(){
    console.log('failed')
  })</code></pre>
In this case you'll get
<pre class="prettyprint"><code>step1
step2
step3
done</code></pre>
Changing the <code>step2</code> to succeed will output
<pre class="prettyprint"><code>step1
step2
done</code></pre>
And making all steps to fail will output
<pre class="prettyprint"><code>step1
step2
step3
fail</code></pre>
So the idea is that each next step is called only if all previous steps failed. If at least one point succeeds then function passed to <code>then</code> is called, otherwise function passed to last <code>catch</code> is called.

And in order to pass data from steps to function passed to <code>then</code> you simply have to call <code>resolve</code> function with your data:
<pre class="prettyprint"><code>function step2() {
  return new Promise(function(resolve, reject) {
    resolve({done: true})
  })
}</code></pre>
<h2>Sources</h2>
<ol>
	<li>(article) <a href="http://c2.com/cgi/wiki?ChainOfResponsibilityPattern" target="_blank">Chain or Responsibility pattern</a></li>
</ol>
