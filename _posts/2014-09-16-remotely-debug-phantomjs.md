---
title: Remotely debug PhantomJS
date: 2014-09-16T10:19:30+00:00
author: bumbu
layout: post
permalink: /remotely-debug-phantomjs/
categories: development
---
If you need to nicely debug a page in PhantomJS you can use remote debugging feature.

First you have to create a file <em>test.js</em> with following contents:
<code>require('webpage').create().open("http://localhost/yourproject.html");</code>
Now you do:
<ol>
	<li>Run in terminal <code>phantomjs --remote-debugger-port=9000 test.js</code></li>
	<li>Open in browser (ex. Chrome) page <a href="http://localhost:9000">localhost:9000</a></li>
	<li>There should be a link with title about:page - follow that link</li>
	<li>A remote debugger (similar to Chrome) will open as a page. Type in its console (bottom left icon) <code>__run()</code> and run it (press enter)</li>
	<li>Open again <a href="http://localhost:9000">localhost:9000</a> in a new tab, now you should see one more link - follow it</li>
	<li>You opened the debugger for your page</li>
</ol>
If you want to set breakpoints before page will run then replace your <em>test.js</em> contents with:
<pre class="language-js"><code>page = require('webpage').create();
page.open('http://localhost/tmp/hammer.js/tests/unit/', function(){
  debugger;  // this is necessary
  page.evaluate(function() {
    setTimeout(function(){
      debugger;
      window.callPhantom('done');
    }, 0);
  });
});</code></pre>
Now you do:
<ol>
	<li>Run in terminal <code>phantomjs --remote-debugger-port=9000 test.js</code></li>
	<li>Open in browser (ex. Chrome) page <a href="http://localhost:9000">localhost:9000</a></li>
	<li>There should be a link with title about:page - follow that link</li>
	<li>A remote debugger (similar to Chrome) will open as a page. Type in its console (bottom left icon) <code>__run()</code> and run it (press enter)</li>
	<li>Open again <a href="http://localhost:9000">localhost:9000</a> in a new tab, now you should see one more link - follow it</li>
	<li>Go back to first tab and continue script execution (it should be stopped at debugger point)</li>
	<li>Go back to second tab and set your desired break points. When you set them continue script execution (it should be stopped at debugger point)</li>
	<li>Now inspect your code.</li>
</ol>
