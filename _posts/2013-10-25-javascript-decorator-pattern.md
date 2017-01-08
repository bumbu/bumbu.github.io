---
title: JavaScript Decorator Pattern
date: 2013-10-25T18:46:41+00:00
author: bumbu
layout: post
permalink: /javascript-decorator-pattern/
categories: learning
---
<h2>Definition</h2>
<blockquote>The Decorator Pattern attaches additional responsibilities to an object dynamically.</blockquote>
Decorator pattern emphasise Open-Closed principle - <em>classes should be open for extension, but closed for modification</em>.

The pattern is an alternative for sub-classing. It is usually used in places where it is necessary to add additional functionality to objects. For example if you start with 3 basic objects and 4 different features then you may end up with 3*2^4=48 different objects. More basic object's types or more features and you end up with an enormous number (in case if you want to create all possible objects).

A much easier approach is to add features to basic objects when they are necessary. That's one feature of Decorator Pattern.

Other important feature of Decorator Pattern is that it allows you to add functionality without altering existing base code. This way your'e likely to produce less bugs or to break the system.
<h2>Basic Decorator Example</h2>
This is one very often used patterns and probably most unknown. A vary basic example may look like:
<pre class="language-js"><code>// Basic object
var Book = {
  name: 'great book'
, pages: 145
}

// Let's decorate
Book.getHeading = function(){
  return 'title: ' + this.name + '; pages: ' + this.pages
}

console.log(Book.getHeading()) // title: great book; pages: 145</code></pre>
Here we simply added new property to basic object. But we broke the Open-Closed Principle. In order to fix that we simply have to create a new object which delegates to basic object:
<pre class="language-js"><code>// Basic object
var Book = {
    name: 'great book'
  , pages: 145
  }
  , BookNew = Object.create(Book)

// Let's decorate
BookNew.getHeading = function(){
  return 'title: ' + this.name + '; pages: ' + this.pages
}

console.log(BookNew.getHeading()) // title: great book; pages: 145</code></pre>
If we need to create many objects and we need to pass many features then we may makeup a function like this:
<pre class="language-js"><code>// Basic object
var Book = {
    name: 'great book'
  , pages: 145
  }

// Decoration function
function decorate(obj, decoration) {
  var objNew = Object.create(obj)
  for(i in decoration){
    objNew[i] = decoration[i]
  }
  return objNew
}

// Let's decorate
var BookNew = decorate(Book, {
  getHeading: function(){
    return 'title: ' + this.name + '; pages: ' + this.pages
  }
, isItBig: function(){
    return this.pages &gt; 500
  }
})

console.log(BookNew.getHeading()) // title: great book; pages: 145
console.log(BookNew.isItBig()) // false</code></pre>
<h2>Decorating using jQuery's extend method</h2>
Using jQuery we can shorten a little bit our decorate function:
<pre class="language-js"><code>// Basic object
var Book = {
    name: 'great book'
  , pages: 145
  }

// Decoration function
function decorate(obj, decoration) {
  return $.extend(Object.create(obj), decoration)
}

// Let's decorate
var BookNew = decorate(Book, {
  getHeading: function(){
    return 'title: ' + this.name + '; pages: ' + this.pages
  }
, isItBig: function(){
    return this.pages &gt; 500
  }
})

console.log(BookNew.getHeading()) // title: great book; pages: 145
console.log(BookNew.isItBig()) // false</code></pre>
It may be used without wrapping into <i>decorate</i> function as it takes roughly one line.
<h2>Solving the problem of overriding object attributes</h2>
All previous examples have one common problem - if base object has an attribute with the same name as the one we want to use for decoration then the attribute in base object will be overridden in new object. In order to overcome that we can check if base object has the attribute we plan to use for decoration.
<pre class="language-js"><code>// Basic object
var Book = {
    price: 45
  , getPrice: function() {
      return this.price
    }
  }

// Decoration function
function decorate(obj, decoration) {
  var objNew = Object.create(obj)
  for (i in decoration){
    // Check if base object has this property and if it is a function
    if (obj[i] !== undefined &amp;&amp; Object.prototype.toString.call(decoration[i]) === '[object Function]') {
      if (Object.prototype.toString.call(obj[i]) === '[object Function]') {
        var func = decoration[i](obj[i]())
      } else {
        var func = decoration[i](obj[i])
      }

      objNew[i] = function(){
        return func
      }
    } else {
      objNew[i] = decoration[i]
    }
  }
  return objNew
}

// Let's decorate
var BookNew = decorate(Book, {
  getPrice: function(price){
    return Math.ceil(price * 1.1)
  }
})

var BookOld = decorate(Book, {
  price: function(price) {
    return price * 0.4
  }
})

console.log(Book.getPrice()) // 45
console.log(BookNew.getPrice()) // 50
console.log(BookOld.price()) // 18</code></pre>
Here are 2 things to mention:
<ul>
  <li>We do not check for <em>hasOwnProperty</em> as base objects may have functionality gained through delegation, and we want to use that. However you can add this check if you need it.</li>
  <li>If base object has given attribute we'll check if it is a function or not. If it is a function we'll use it's result, if not we'll pass it directly to decorator's method.</li>
</ul>
<h2>Decorating through prototype</h2>
Actually it is the same as basic example, but using a different implementation:
<pre class="language-js"><code>var Book = {}
Book.decorate = function () {
  console.log('Book has pages.')
}

Book.getDecorator = function (deco) {
  Book[deco].prototype = this
  return new Book[deco]
}

Book.Images = function () {
  this.decorate = function () {
    this.Images.prototype.decorate()
    console.log('Add images')
  }
}

Book.Cover = function () {
  this.decorate = function () {
    this.Cover.prototype.decorate()
    console.log('Add cover')
  }
}

Book = Book.getDecorator('Images')
Book = Book.getDecorator('Cover')

Book.decorate()</code></pre>
Here we are overriding object pointer and relation with previous objects is through prototype. It may work well if you need to have only one object in a given namespase/clojure, but if you want at least 2 objects based on same base object than you'll be in trouble with this solution. Also you can't decorate using the same decorator 2 times as it will give get into infinite loop.
<h2>CoffeeScript Example</h2>
As CoffeeScript tries to simulate classes we'll use this to decorate our objects.
<pre class="language-coffeescript"><code>class Book
  constructor: (@title, @pages) -&gt;

  getDescription: () -&gt;
    """Author: #{@title}
    Pages: #{@pages}"""

class Decorator
  constructor: (@book) -&gt;

  getDescription: () -&gt;
    @book.getDescription()

class Cover extends Decorator
  getDescription: () -&gt;
    super() + "\nCover: yes"

class Old extends Decorator
  getDescription: () -&gt;
    super() + "\nOld: yes"

book = new Book("War and Peace", 999)
bookWithCover = new Cover(book)
oldBook = new Old(book)
oldBookWithCover = new Old(bookWithCover)

console.log book.getDescription()
console.log bookWithCover.getDescription()
console.log oldBook.getDescription()
console.log oldBookWithCover.getDescription()</code></pre>
<h2>Sources</h2>
<ol>
  <li>(github) <a href="https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/decorator.html" target="_blank">shichuan / javascript-patterns / design-patterns / decorator.html</a></li>
  <li>(github) <a href="https://github.com/aksharp/Design-Patterns/blob/master/CoffeeScript/Decorator.coffee" target="_blank">Design-Patterns/CoffeeScript/Decorator.coffee</a></li>
  <li>(book) <a href="http://www.amazon.com/First-Design-Patterns-Elisabeth-Freeman/dp/0596007124">Head First Design Patterns</a></li>
  <li>(book) <a href="http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript" target="_blank">Learning JavaScript Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/9780596806767.do" target="_blank">JavaScript Patterns: Build Better Applications with Coding and Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/0636920025832.do" target="_blank">Learning JavaScript Design Patterns: A JavaScript and jQuery Developer's Guide</a></li>
  <li>(book) <a href="http://www.amazon.com/Pro-JavaScript-Design-Patterns-Object-Oriented/dp/159059908X" target="_blank">Pro JavaScript Design Patterns: The Essentials of Object-Oriented JavaScript Programming</a></li>
  <li>(book) <a href="http://coffeescriptcookbook.com/" target="_blank">CoffeeScript Cookbook</a></li>
  <li>(article) <a href="http://www.dofactory.com/javascript-decorator-pattern.aspx" target="_blank">dofactory JavaScript Decorator Pattern</a></li>
</ol>
