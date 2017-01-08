---
title: JavaScript Insertion Sort
date: 2014-11-02T07:42:30+00:00
author: bumbu
layout: post
permalink: /javascript-insertion-sort/
categories: learning
---
Insertion Sort is a simple algorithm. Many start learning sorting algorithms with Insertion Sort. The idea is to take elements one by one (from left to right) and to place them in such a way that traversed part of the array is sorted:
<ul>
	<li>Take 2nd element and check if it smaller than 1st. If yes then swap. Now first 2 elements are sorted</li>
	<li>Take 3rd element and check if it smaller than 2nd or 1st. Place in such a way that first 3 elements will be sorted</li>
	<li>Take 4th ...</li>
</ul>

<pre class="language-js"><code>function insertionSort(arr){
  // Init variables
  var i, j, key;

  // Loop through array
  for (j = 1; j &lt; arr.length; j++){
    key = arr[j];
    i = j - 1;

    // Move values so that key can be placed in right position
    while(i &gt;= 0 &amp;&amp; arr[i] &gt; key){
      arr[i+1] = arr[i];
      i -= 1;
    }

    // Put key in its place
    arr[i+1] = key;
  }
  return arr;
}</code></pre>
