---
title: Decrease typing lag in WebStorm (or any IDEA product)
date: 2015-12-26T19:11:26+00:00
author: bumbu
layout: post
permalink: /decrease-typing-lag-in-webstorm-or-any-idea-product/
categories: blog
---
There is an <a href="http://blog.jetbrains.com/idea/2015/08/experimental-zero-latency-typing-in-intellij-idea-15-eap/" target="_blank">experimental feature</a> in IDEA products (WebStorm, PHPStorm, PyCharm...) that allows decreasing typing lag. This means that typed symbols appear faster on your screen. There is a <a href="https://pavelfatin.com/typing-with-pleasure/" target="_blank">nice article about typing with pleasure</a> that explains why faster response is better.

In order to enable this feature in current IDEA products do these 3 simple steps:
<ul>
	<li>Open <em>Help -&gt; Edit custom properties</em> from the menu</li>
	<li>Add <code>editor.zero.latency.typing=true</code></li>
	<li>Restart the application</li>
</ul>
You may not see the difference, but with this feature on I feel that WebStorm comes closer to how typing in Sublime Text feels.
