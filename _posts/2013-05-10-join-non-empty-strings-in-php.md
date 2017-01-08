---
title: Join non-empty strings in PHP
date: 2013-05-10T12:33:41+00:00
author: bumbu
layout: post
permalink: /join-non-empty-strings-in-php/
categories: development
---
Sometimes you have to join strings but keep them divided by a character (space, comma...). For example you want to output the full name of a customer, and to save time you do:
<pre class="language-php"><code>$str = $customer-&gt;lastname . ' ' . $customer-&gt;firstname . ' ' . $customer-&gt;fathername;</code></pre>
But if any of values is absent then you'll end up with 2 spaces in a row (which is ok as browser will show only one if these are not non-breaking spaces). But how about dividing by commas? Noboy wants 2 commas in a row. Most probably you'll through the following steps:
<ul>
	<li>create an array</li>
	<li>populate it with all non-empty values</li>
	<li>join them</li>
</ul>
Here's the same sollution but in one line:
<pre class="language-php"><code>$str = join(' ', array_filter(array($customer-&gt;lastname, $customer-&gt;firstname, $customer-&gt;fathername)));</code></pre>
