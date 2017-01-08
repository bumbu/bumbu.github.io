---
title: Splitting Requrie.js optimized file into multiple bunches
date: 2015-06-29T16:40:46+00:00
author: bumbu
layout: post
permalink: /splitting-requrie-js-optimized-file-into-multiple-bunches/
categories: development
---
Let's say that you use <a href="http://requirejs.org/" target="_blank">Require.js</a> in your project. On production you use <a href="http://requirejs.org/docs/optimization.html" target="_blank">r.js</a> optimizer in order to have one single file. At some point your optimized file may became huge (few Mb if not <em>gzip</em>ed) and then you'll want to split common/critical functionality from secondary functionality that may be deferred.

For example let's take following project structure:
<ul>
 	<li>main.js</li>
 	<li>utils/
<ul>
 	<li>router.js</li>
 	<li>renderer.js</li>
</ul>
</li>
 	<li>vendor/
<ul>
 	<li>jQuery.js</li>
</ul>
</li>
 	<li>modules/
<ul>
 	<li>chat.js</li>
 	<li>page.js</li>
</ul>
</li>
</ul>
In this case <code>chat.js</code> can be considered as secondary functionality. Now let's see how to split critical and secondary functionality so that loading secondary functionality could be deferred.
<h2>Splitting optimized file into multiple bunches</h2>
Splitting optimized file into multiple files is builtin r.js and can be used by adding <em>modules</em> attribute to Require.js configuration:
<pre class="prettyprint lang-js"><code>require.config({
  appDir: './'
, mainConfigFile: './main.js'
, dir: './public'
, modules: [{
    // First define secondary functionality
    name: 'modules/chat.js'
  , exclude: ['utils/renderer.js', 'vendor/jQuery.js']
  }, {
    // Now define critical functionality
    name: 'main.js'
  , exclude: ['modules/chat.js']
  }]
})
</code></pre>
Now when running r.js optimizer we'll get 2 files as output: <code>main.js</code> and <code>modules/chat.js</code>. The only thing left is to require <code>chat.js</code> file when it will be necessary or when <code>main.js</code> finished loading.

Loading chat.js when main.js fihished loading:
<pre class="prettyprint lang-js"><code>// main.js
define([
  'router.js'
, 'renderer.js'
, 'vendor/jQuery.js'
, 'modules/page.js'
], function(Router, Renderer, jQuery, PageModule) {
  // Run some initialization code
  initEverything()

  // Now load chat
  require(['modules/chat.js'], function(ChatModule) {
    // Run chat initialization
    ChatModule.init()
  })
})</code></pre>
Loading chat.js only when it is required (ex. on click) is the same as previous example. For that <code>require(['modules/chat.js'], function(){})</code> should be run on desired event.
<h2>Splitting common and page-specific functionality in multi-page projects</h2>
If you're looking for splitting functionality for multi-page projects then you may want to take a look at <a href="https://github.com/requirejs/example-multipage" target="_blank">requirejs/example-multipage</a> and <a href="https://github.com/requirejs/example-multipage-shim" target="_blank">requirejs/example-multipage-shim</a>. This examples use almost the same logic. The only difference is the order in which files are required: each page has a file with its specific functionality that requires common functionality.
