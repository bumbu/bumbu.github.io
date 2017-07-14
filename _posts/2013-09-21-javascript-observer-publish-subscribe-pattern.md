---
title: JavaScript Observer (Publish/Subscribe) Pattern
date: 2013-09-21T18:39:00+00:00
author: bumbu
layout: post
permalink: /javascript-observer-publish-subscribe-pattern/
categories: learning home
---
That's the pattern that I love. It seems to be a core part of JavaScript. And it gives ability of quite many ways of implementing it depending on requirements.
<h2>Definition</h2>
<blockquote>The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automatically.</blockquote>
Taking in account previous patterns this pattern adds one more principle:
<ul>
  <li>Strive for loosely coupled designs between objects that interact</li>
</ul>
So the main idea is that we have one main object to which you subscribe (Subject/Observable) and a lot of objects (Observers) that subscribe and wait for events.

<a href="{{site.root}}/assets/images/2013/09/Drawing1.png"><img class="alignnone size-full wp-image-549" alt="Drawing1" src="{{site.root}}/assets/images/2013/09/Drawing1.png" width="170" height="224" /></a>

One very important thing to remember is that objects may receive messages in random order, so you shouldn't rely on the order in which you added Observers.
<h2>Basic Observer Example</h2>
What will follow is not the simplest example. The simplest example would be the one that is not passing the message.
<pre class="language-js"><code>var Observable = {
    observers: []
  , addObserver: function(observer) {
      this.observers.push(observer)
    }
  , removeObserver: function(observer) {
      var index = this.observers.indexOf(observer)

      if (~index) {
        this.observers.splice(index, 1)
      }
    }
  , notifyObservers: function(message) {
      for (var i = this.observers.length - 1; i &gt;= 0; i--) {
        this.observers[i](message)
      };
    }
  }

Observable.addObserver(function(message){
  console.log("First observer message:" + message)
})

var observer = function(message){
  console.log("Second observer message:" + message)
}

Observable.addObserver(observer)

Observable.notifyObservers('test 1')
// Second observer message:test 1
// First observer message:test 1

Observable.removeObserver(observer)

Observable.notifyObservers('test 2')
// First observer message:test 2</code></pre>
If you want to remove observers using some sort of ID instead of passing callback it can be done in following way:
<pre class="language-js"><code>var Observable = {
    observers: []
  , lastId: -1
  , addObserver: function(observer) {
      this.observers.push({
        callback: observer
      , id: ++this.lastId
      })

      return this.lastId
    }
  , removeObserver: function(id) {
      for (var i = this.observers.length - 1; i &gt;= 0; i--) {
        this.observers[i]
        if (this.observers[i].id == id) {
          this.observers.splice(i, 1)
          return true
        }
      }

      return false
    }
  , notifyObservers: function(message) {
      for (var i = this.observers.length - 1; i &gt;= 0; i--) {
        this.observers[i].callback(message)
      };
    }
  }

var id_1 = Observable.addObserver(function(message){
  console.log("First observer message:" + message)
})

var observer = function(message){
  console.log("Second observer message:" + message)
}

var id_2 = Observable.addObserver(observer)

Observable.notifyObservers('test 1')
Observable.removeObserver(id_2)
Observable.notifyObservers('test 2')</code></pre>
<h2>Pull vs Push</h2>
There are two main strategies for observer pattern:
<ul>
  <li>Push behaviour - when an event happens Observable object will notify all Observers by sending all the new data to them</li>
  <li>Pull behaviour - when an event happens Observable object will notify all Observers and each Observer will pull the information it needs from the Observable</li>
</ul>
Pull method is more preferable as in this case you'll ask only for data that you need. Otherwise at some point you Observable may send huge objects with a lot of attributes. In this example Observable will only notify Observers that something changed and each Observer will take the data it needs. Also in this example we hide observers array and private values in anonymous function closure.
<pre class="language-js"><code>var Observable = {}

;(function(O){
  var observers = []
    , privateVar

  O.addObserver = function(observer) {
    observers.push(observer)
  }

  O.removeObserver = function(observer) {
    var index = observers.indexOf(observer)

    if (~index) {
      observers.splice(index, 1)
    }
  }

  O.notifyObservers = function() {
    for (var i = observers.length - 1; i &gt;= 0; i--) {
      observers[i].update()
    };
  }

  O.updatePrivate = function(newValue) {
    privateVar = newValue
    this.notifyObservers()
  }

  O.getPrivate = function() {
    return privateVar
  }
}(Observable))

Observable.addObserver({
  update: function(){
    this.process()
  }
, process: function(){
    var value = Observable.getPrivate()
    console.log("Private value is: " + value)
  }
})

Observable.updatePrivate('test 1')
// Private value is: test 1

Observable.updatePrivate('test 2')
// Private value is: test 2</code></pre>
<h2>Observer with topics</h2>
In order not to create multiple observable objects it is much better to add topic functionality to Observer pattern. In simplest form it may look like:
<pre class="language-js"><code>var Observable = {
    observers: []
  , addObserver: function(topic, observer) {
      if (this.observers[topic] || (this.observers[topic] = []){
        this.observers[topic].push(observer)
      }
    }
  , removeObserver: function(topic, observer) {
      if (!this.observers[topic])
        return;

      var index = this.observers[topic].indexOf(observer)

      if (~index) {
        this.observers[topic].splice(index, 1)
      }
    }
  , notifyObservers: function(topic, message) {
      if (!this.observers[topic])
        return;

      for (var i = this.observers[topic].length - 1; i &gt;= 0; i--) {
        this.observers[topic][i](message)
      };
    }
  }

Observable.addObserver('cart', function(message){
  console.log("First observer message:" + message)
})

Observable.addObserver('notificatons', function(message){
  console.log("Second observer message:" + message)
})

Observable.notifyObservers('cart', 'test 1')
// First observer message:test 1

Observable.notifyObservers('notificatons', 'test 2')
// Second observer message:test 2</code></pre>
More advanced versions may have features like:
<ul>
  <li>Subtopics (e.x. /<em>bar/green</em> or <em>bar.green</em>)</li>
  <li>Publishing to topic propagates to subtopics</li>
  <li>Publishing to all topics</li>
  <li>Giving a priority to subscribers</li>
</ul>
<h2>Observer Pattern using jQuery.Callback</h2>
jQuery has quite a nice feature like $.Callback. Besides of classical Observer functionality it also has a <a href="http://api.jquery.com/jQuery.Callbacks/" target="_blank">set of flags</a>:
<ul>
  <li><em>once:</em> Ensures the callback list can only be fired once (like a Deferred)</li>
  <li><em>memory:</em> Keeps track of previous values and will call any callback added after the list has been fired right away with the latest "memorized" values (like a Deferred).</li>
  <li><em>unique:</em> Ensures a callback can only be added once (so there are no duplicates in the list).</li>
  <li><em>stopOnFalse:</em> Interrupts callings when a callback returns false.</li>
</ul>
Using this options your can customise your Observer in quite interesting ways. Lets see the most simple example using jQuery.Callback:
<pre class="language-js"><code>var callbacks = jQuery.Callbacks()
  , Topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    }

function fn1( value ){
  console.log( "fn1: " + value );
}

function fn2( value ){
  console.log("fn2: " + value);
}

Topic.subscribe(fn1);
Topic.subscribe(fn2);

Topic.publish('hello world!');
Topic.publish('woo! mail!');</code></pre>
If you want to see a more advanced example with topic than take a look at <a href="https://github.com/shichuan/javascript-patterns/blob/master/jquery-patterns/pubsub-callback.html" target="_blank">this [1a]</a> example.
<h2>CoffeeScript example</h2>
This is a simple example without topics. Almost the same example (at least the same amount of lines) can be found in CoffeeScript Cookbook [7].
<pre class="language-coffeescript"><code>class Observable
    constructor: () -&gt;
        @subscribers = []
    subscribe: (callback) -&gt;
        @subscribers.push callback
    unsubscribe: (callback) -&gt;
        @subscribers = @subscribers.filter (item) -&gt; item isnt callback
    notify: () -&gt;
        subscriber() for subscriber in @subscribers

class Observer1
    onUpdate: () -&gt;
        console.log "1st got new message"

class Observer2
    onUpdate: () -&gt;
        console.log "2nd updated"

observable = new Observable()
observer1 = new Observer1()
observer2 = new Observer2()

observable.subscribe observer1.onUpdate
observable.subscribe observer2.onUpdate
observable.notify()</code></pre>
<h2>Sources</h2>
<ol>
  <li>(github) <a href="https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/observer.html" target="_blank">shichuan / javascript-patterns / design-patterns / observer.html</a> and <a href="http://shichuan.github.io/javascript-patterns/" target="_blank">jQuery examples</a></li>
  <li>(book) <a href="http://www.amazon.com/First-Design-Patterns-Elisabeth-Freeman/dp/0596007124">Head First Design Patterns</a></li>
  <li>(book) <a href="http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript" target="_blank">Learning JavaScript Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/9780596806767.do" target="_blank">JavaScript Patterns: Build Better Applications with Coding and Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/0636920025832.do" target="_blank">Learning JavaScript Design Patterns: A JavaScript and jQuery Developer's Guide</a></li>
  <li>(book) <a href="http://www.amazon.com/Pro-JavaScript-Design-Patterns-Object-Oriented/dp/159059908X" target="_blank">Pro JavaScript Design Patterns: The Essentials of Object-Oriented JavaScript Programming</a></li>
  <li>(book) <a href="http://coffeescriptcookbook.com/" target="_blank">CoffeeScript Cookbook</a></li>
  <li>(article) <a href="http://www.dofactory.com/javascript-observer-pattern.aspx" target="_blank">dofactory JavaScript Observer Pattern</a></li>
</ol>
