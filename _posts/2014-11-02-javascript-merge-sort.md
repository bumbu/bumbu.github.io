---
title: JavaScript Merge Sort
date: 2014-11-02T07:58:04+00:00
author: bumbu
layout: post
permalink: /javascript-merge-sort/
categories: learning
---
Merge Sort is basically a divide and conquer algorithm. It consists of 2 parts:
<ol>
	<li>Sorting Part
<ol>
	<li>If array length is 1 then return original array</li>
	<li>Divide array into 2 equal parts (where possible) and recursively sort them</li>
	<li>Merge sorted parts</li>
</ol>
</li>
	<li>Merge Part
<ol>
	<li>Merge 2 arrays by taking lowest element from arrays' heads</li>
</ol>
</li>
</ol>
Merge function splits array recursively until there is only 1 element left in each subarray and then merges sorted pairs of subarrays:
<pre class="prettyprint lang-js"><code>function mergeSort(arr){
  // If length is 1 return original
  if (arr.length &lt;= 1) return arr

  // Split array into 2
  var arr1 = arr.slice(0, Math.ceil(arr.length/2))
    , arr2 = arr.slice(Math.ceil(arr.length/2))

  // Recursively sort each subarray
  arr1 = mergeSort(arr1)
  arr2 = mergeSort(arr2)

  // Merge sorted subarrays
  return mergeSortMerge(arr1, arr2)
}</code></pre>
Merge function merges 2 sorted arrays and returns a sorted array:
<pre class="prettyprint lang-js"><code>function mergeSortMerge(arr1, arr2){
  // Revert subarrays so that lowest element are at end
  arr1.reverse(); arr2.reverse();

  // Init variables
  var arr = []
    , l1 = arr1.length - 1
    , l2 = arr2.length - 1

  // While still have elements to process
  while(l1 &gt;= 0 || l2 &gt;= 0){
    // If both arrays have elements
    if (l1 &gt;= 0 &amp;&amp; l2 &gt;= 0) {
      // Take smallest value
      if (arr1[l1] &gt; arr2[l2]) {
        arr.push(arr2[l2])
        l2 -= 1
      } else {
        arr.push(arr1[l1])
        l1 -= 1
      }
    // If elements left only in first subarray
    } else if (l1 &gt;= 0) {
      arr.push(arr1[l1])
      l1 -= 1
    // If elements left only in secnd subarray
    } else {
      arr.push(arr2[l2])
      l2 -= 1
    }
  }
  return arr
}</code></pre>
