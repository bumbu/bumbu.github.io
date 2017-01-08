---
title: Disabling snowflakes on websites
date: 2013-01-02T17:29:54+00:00
author: bumbu
layout: post
permalink: /disabling-snow-on-websites/
categories: development
---
It's winter. It should snow. So you are obliget to add some awesome snow to you website.

Customers who have slow PCes will have their browsers freezed, but it is not a big deal, at least they'll see snowflakes!

Many websites uses <a href="https://github.com/loktar00/JQuery-Snowfall">this</a> plugin to create that effect. But not all of them give you the possibility to stop it (even if it is very easy to do). Example: <a href="http://www.unite.md" target="_blank">one</a> of our mobile operators.

To stop it you simply has to open JS console (in Chrome CTRL+SHIFT+J) and type:
<pre class="language-js"><code>$(document).snowfall('clear')</code></pre>
Happy New Year!
