---
title: Navbar on pure CSS
date: 2013-09-06T22:06:39+00:00
author: bumbu
layout: post
permalink: /navbar-on-pure-css/
categories: development
---
Elements in navigation bar can have 2 states:
<ul>
	<li>Inactive</li>
	<li>Active</li>
</ul>
There are 3 different arrows between these states (there are 4 but we're using only 3):
<ul>
	<li>inactive-inactive
<img class="alignnone size-full wp-image-501" alt="navigation-bar-1" src="{{site.root}}/assets/images/2013/09/navigation-bar-1.png" width="127" height="180" /></li>
	<li>active-inactive
<img class="alignnone size-full wp-image-502" alt="navigation-bar-2" src="{{site.root}}/assets/images/2013/09/navigation-bar-2.png" width="127" height="176" /></li>
	<li>active-active
<img class="alignnone size-full wp-image-503" alt="navigation-bar-3" src="{{site.root}}/assets/images/2013/09/navigation-bar-3.png" width="127" height="173" /></li>
</ul>
In order not to use z-index I set elements in opposite order.

<iframe src="http://jsfiddle.net/bumbu/tLfCB/embedded/result,html,css/" height="300" width="100%" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
