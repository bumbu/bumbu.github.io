---
title: JavaScript Strategy Pattern
date: 2013-09-14T14:47:50+00:00
author: bumbu
layout: post
permalink: /javascript-strategy-pattern/
categories: learning
---
<h2>Definition</h2>
<blockquote>Strategy - defines a family of algorithms, encapsulates each, and makes them interchangeable. Strategy lets the algorithm vary independently form clients that use it. [2]</blockquote>
It is based on few OO Principles:
<ul>
  <li>Encapsulates what varies</li>
  <li>Favor composition over inheritance</li>
  <li>Program to interfaces, not implementations</li>
</ul>
This pattern seems to be very similar to Factory, Command and others. The main difference is that it is <em>one to many</em> pattern (one object can have many strategies). Also this pattern is used to define algorithms. It may be used for:
<ul>
  <li>Using optimal sorting algorithm for different types of data</li>
  <li>Using different algorithms to count product discount based on user type</li>
  <li>Using different algorithms to convert an image/file to different format</li>
  <li>Views facilitated cy Controllers in MVC pattern</li>
</ul>
<h2>Basic Strategy Example</h2>
Lets take a simple example in which we want to output some information about passed in objects. We define 2 handlers for <em>array</em> and <em>object</em>. Also we define one default handler which will be used if no specific handler was set.
<pre class="language-js"><code>var Strategy = {
  strategies: {
    default: function(input) {
      console.log('There is no handler for ' + typeof input + ' type')
    }
  , array: function(input) {
      console.log('Array has ' + input.length + ' elements')
    }
  , object: function(input) {
      console.log('Object string notation: ' + input.toString())
    }
  }
, action: function(input){
    var type = Object.prototype.toString.call(input).match(/\[object (\w+)\]/i)[1].toLowerCase()

    if (this.strategies[type]) {
      this.strategies[type](input)
    } else {
      this.strategies.default(input)
    }
  }
}

Strategy.action({})         // Object string notation: [object Object]
Strategy.action([1, 2, 3])  // Array has 3 elements
Strategy.action('string')   // There is no handler for string type
Strategy.action(true)       // There is no handler for boolean type</code></pre>
Later if necessary we can add more handlers. But the main idea here is that algorithm which processes data is chosen in runtime.

Another example is to choose strategy by yourself:
<pre class="language-js"><code>var Strategy = function(type) {
  if (this.strategies[type]) {
    this.strategy = this.strategies[type]
  } else {
    this.strategy = this.strategies.default
  }
}

Strategy.prototype.strategies = {
  default: function(input) {
    console.log('There is no handler for ' + typeof input + ' type')
  }
, array: function(input) {
    console.log('Array has ' + input.length + ' elements')
  }
, object: function(input) {
    console.log('Object string notation: ' + input.toString())
  }
}

Strategy.prototype.action = function(input) {
  this.strategy(input)
}

var s = new Strategy('array')

s.action({})         // Array has undefined elements
s.action([1, 2, 3])  // Array has 3 elements
s.action('string')   // Array has 6 elements
s.action(true)       // Array has undefined elements</code></pre>
Lets try one <em>class-like</em> example. For algorithms we'll have one parent object <em>Sort</em> for all common functionality. Then we create as many <em>Sort's</em> children as we need. If <em>Sort</em> object is empty (as in example) we can easily can get rid of it and of objects linking.
<pre class="language-js"><code>var Sort = {}

var BubbleSort = Object.create(Sort)
BubbleSort.sort = function(data) {
  console.log('bubbling')
  return data.sort()
}

var MergeSort = Object.create(Sort)
MergeSort.sort = function(data) {
  console.log('merging')
  return data.sort()
}

var Strategy = {
  init: function(type) {
    if (type === 'bubble')
      this.sortAlgorithm = BubbleSort
    else if (type === 'merge')
      this.sortAlgorithm = MergeSort
  }
, process: function(data) {
    return this.sortAlgorithm.sort(data)
  }
}

s1 = Object.create(Strategy)
s1.init('bubble')
s1.process([1,3,4,2])

s2 = Object.create(Strategy)
s2.init('merge')
s2.process([1,3,4,2])</code></pre>
<h2>CoffeeScript example</h2>
Lets start with classes:
<pre class="language-coffeescript"><code>class Sorting
  sort: (data)-&gt;
    data.sort(@algorithm)
  algorithm: (a, b) -&gt;
    return a - b

class RandomSorting extends Sorting
  algorithm: (a, b) -&gt;
    return [-1, 0, 1][new Date().getTime() % 3]

class ReversedSorting extends Sorting
  algorithm: (a, b) -&gt;
    return b - a

class Strategy
  constructor: (type) -&gt;
    switch type
      when 'random' then @algorithm = new RandomSorting()
      when 'reverse' then @algorithm = new ReversedSorting()
      else @algorithm = new Sorting()
  sort: (data) -&gt;
    return @algorithm.sort(data)

s = new Strategy('default')
console.log s.sort([2,5,1,3])   # [1, 2, 3, 5]

s2 = new Strategy('reverse')
console.log s2.sort([2,5,1,3])  # [5, 3, 2, 1]

s3 = new Strategy('random')
console.log s3.sort([2,5,1,3])  # [3, 1, 5, 2]</code></pre>
As in JavaScript we don't care about polymorphism and functions are first-class objects we can use a more clear and simple Strategy pattern implementation:
<pre class="language-coffeescript"><code>SimpleSort = (data)-&gt;
  data.sort()

ReversedSort = (data)-&gt;
  data.sort (a, b) -&gt;
    return b - a

RandomSort = (data)-&gt;
  data.sort (a, b) -&gt;
    return [-1, 0, 1][new Date().getTime() % 3]

Sorter = (algorithm) -&gt;
  sort: (list) -&gt; algorithm list

s = new Sorter SimpleSort
console.log s.sort([2,5,1,3])   # [1, 2, 3, 5]

s2 = new Sorter ReversedSort
console.log s2.sort([2,5,1,3])  # [5, 3, 2, 1]

s3 = new Sorter RandomSort
console.log s3.sort([2,5,1,3])  # [3, 1, 5, 2]</code></pre>
<h2>Sources</h2>
<ol>
  <li>(github) <a href="https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/strategy.html" target="_blank">shichuan / javascript-patterns / design-patterns / strategy.html</a></li>
  <li>(book) <a href="http://www.amazon.com/First-Design-Patterns-Elisabeth-Freeman/dp/0596007124">Head First Design Patterns</a></li>
  <li>(book) <a href="http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript" target="_blank">Learning JavaScript Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/9780596806767.do" target="_blank">JavaScript Patterns: Build Better Applications with Coding and Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/0636920025832.do" target="_blank">Learning JavaScript Design Patterns: A JavaScript and jQuery Developer's Guide</a></li>
  <li>(book) <a href="http://www.amazon.com/Pro-JavaScript-Design-Patterns-Object-Oriented/dp/159059908X" target="_blank">Pro JavaScript Design Patterns: The Essentials of Object-Oriented JavaScript Programming</a></li>
  <li>(book) <a href="http://coffeescriptcookbook.com/" target="_blank">CoffeeScript Cookbook</a></li>
  <li>(article) <a href="http://www.dofactory.com/javascript-strategy-pattern.aspx" target="_blank">dofactory JavaScript Strategy Pattern</a></li>
  <li>(article) <a href="http://blog.niftysnippets.org/2010/09/say-what.html" target="_blank">say what?</a></li>
  <li>(article) <a href="http://davidwalsh.name/javascript-objects-deconstruction">JS Objects: De”construct”ion</a></li>
  <li>(wiki) <a href="http://centurion.dynalias.com/w/programming/start" target="_blank">Design Pattern Encapsulation Hierarchy</a></li>
</ol>
