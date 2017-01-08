---
title: Fulfill empty links using regexp and Sublime Text
date: 2013-04-30T11:29:46+00:00
author: bumbu
layout: post
permalink: /fulfill-empty-links-using-regexp-and-sublimetext/
categories: development
---
Very often while doing some HTML slicing you may add links with text and leaving href attribute as #. It is fast and you know that you may change href attributes later. Now if you have many (&gt;10) links, it is somehow boring to add links manually, so you can do it fast using regexp and Sublime Text.

In order to do that you have to use Search and Replace feature (Ctrl+h) in Sublime Text. Make sure that Regular Expression button is pressed (Alt+r or small square button on the bottom left).

In <i>Find What:</i> input: <code>href=\"#\"([\s\w\"\=]*)&gt;([\w\.]+)</code>

In <i>Replace With: </i> input:<code>href="http://$2"$1&gt;$2</code>

Now all your links like:
<pre class="language-html"><code>&lt;a href="#"&gt;www.bumbu.me&lt;/a&gt;
&lt;a href="#" class="one"&gt;www.bumbu.me&lt;/a&gt;</code></pre>
Should become:
<pre class="language-html"><code>&lt;a href="http://www.bumbu.me"&gt;www.bumbu.me&lt;/a&gt;
&lt;a href="http://www.bumbu.me" class="one"&gt;www.bumbu.me&lt;/a&gt;</code></pre>
