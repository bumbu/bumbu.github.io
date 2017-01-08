---
title: Allow mouse whell vertical scroll in jScrollPane
date: 2013-07-01T00:19:27+00:00
author: bumbu
layout: post
permalink: /allow-mouse-whell-vertical-scroll-in-jscrollpane/
categories: development
---
jScrollPane is a nice plugin. It even has mousewhell (scroll) support. But if pane is in the middle of your page and you are scrolling through the page, your moure (and page) will stop on pane. It is quite disturbing.

A simple solution (if you don't need mouse scrolling at all) is to add following lines before your plugin invocation:
<pre class="language-js"><code>$(function () {
	if ($.fn.mwheelIntent === undefined)
		$.fn.mwheelIntent = function(){}
})</code></pre>
or if you don't mind you can add this code directly in your plugin (only if it is not minified):
<pre class="language-js"><code>(function($,window,undefined){
	if ($.fn.mwheelIntent === undefined)
		$.fn.mwheelIntent = function(){}</code></pre>
