---
title: Unite internet (3G) settings for android devices
date: 2013-01-08T15:11:45+00:00
author: bumbu
layout: post
permalink: /unite-internet-3g-settings-for-android-devices/
categories: blog
---
On official unite web page there is a notion about how to set internet for mobile devices. It says to set APN as
<pre class="language-none"><code>internet3g.unite.md</code></pre>
But this didn't work for me. So in the end, settings should be:
<pre class="language-none"><code>APN name: Unite Internet Postpaid
APN: internet.unite.md</code></pre>
On android 4 it is set in Settings &gt; (under Wireless and Networks) More... &gt;Mobile Networks &gt; Access point names &gt; (menu) &gt; New APN
