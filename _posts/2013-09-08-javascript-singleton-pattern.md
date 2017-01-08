---
title: JavaScript Singleton Pattern
date: 2013-09-08T14:49:21+00:00
author: bumbu
layout: post
permalink: /javascript-singleton-pattern/
categories: learning
---
<h2>Definition</h2>
Main purpose of singleton is to provide a single instance of a specific class. In terms of Javascript it means to have only one object of a certain type.

Such an object may be handy for things like:
<ul>
  <li>Database drivers (which take care especially of connections)</li>
  <li>Dialog boxes management</li>
  <li>Ajax requests (in order not to exceed max number of requests)</li>
  <li>Global settings (in order to have only one set of settings)</li>
</ul>
In statical typed OOP languages this is done by making constructor private and retrieving instance pointer via static public function. For example in JAVA:
<pre class="language-js"><code>public class Singleton {
  private static Singleton instance = null;

  private Singleton() {}

  public static Singleton getInstance() {
    if (instance == null) {
      instance = new Singleton ();
    }
    return instance;
  }
}

// Usage
Singleton.getInstance()</code></pre>
GoF's applicability of singleton is described as:
<ul>
  <li>There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point.</li>
  <li>When the sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.</li>
</ul>
The second point here refers to branching:
<pre class="language-js"><code>getInstance = function(){
  if (this.instance === null) {
    if (isIE()) {
       this.instance = new SingletonForIE()
    } else {
       this.instance = new SingletonForNonIE()
    }
  }
  return this.instance;
}</code></pre>
Branching looks like Factory pattern. It may be strange why it is used in here, but the reason is that there may be a lot of cases when you want to have different objects depending on environment but you want to check the environment only one time - on object initialisation.

Generally Singleton is considered to be an anti-pattern. Probably because of breaking single responsibility principle: <em>every class should have a single responsibility, and that responsibility should be entirely encapsulated by the class.</em> But usually Singleton has responsibility of assuring to be unique and one more which is its main purpose.
<h2>Basic JavaScript Singleton</h2>
Taking in account that in JavaScript you can instantiate a object without defining a class, the most simple singleton will look like:
<pre class="language-js"><code>Singleton = {}</code></pre>
There will be only one unique instance of this object. But it's simplicity bring many possible drawbacks:
<ul>
  <li>It can be rewritten</li>
  <li>You must assure that it is instantiated before its first use</li>
  <li>All its members will be public (easy to rewrite or remove)</li>
  <li>If it will have a huge payload or some resource intensive tasks than it may block application initialisation</li>
</ul>
JavaScript has no classes, but it has keyword <em>new</em> which calls constructor function when object is instantiated. But this constructor can't be set as private so the classical method will not work here. What we can actually do is to return object instance from constructor method if it was previously instantiated. This way object creation will look as usual <em>s = new Singleton()</em> and not <em>s = Singleton.getInstance()</em> as it is in Java (and many other languages). We'll need to cache our object instance. We can use a global variable as a cache or prototype object.

Caching instance in a global variable isn't much different from just having an object:
<pre class="language-js"><code>var instance
function Singleton(){
  if(instance !== undefined)
    return instance

  instance = this
}</code></pre>
The only benefits of this implementation are instantiation of object using <em>new</em> keyword and lazy instantiation. But this way we pollute global namespace. So let's cache our instance in static attributes (attributes assigned to constructor):
<pre class="language-js"><code>function Singleton(){
  if(Singleton.instance !== undefined)
    return Singleton.instance

  Singleton.instance = this
}</code></pre>
which is almost the same as
<pre class="language-js"><code>function Singleton(){
  if(Singleton.prototype.instance !== undefined)
    return Singleton.prototype.instance

  Singleton.prototype.instance = this
}</code></pre>
The only difference between this 2 solutions is that in first case we store instance in constructor object, and in second case in prototype object. It may be important when using prototypal inheritance.

Now we don't have to care about object instantiation before its first usage as in case with defining object using the literal syntax for object creation.
<h2>Overriding constructor</h2>
In order not to use prototype caching we can override constructor function at first instantiation:
<pre class="language-js"><code>function Singleton(){
  var instance = this

  // rewrite the constructor
  Singleton = function(){
    return instance
  }
}

// add param1 to prototype
Singleton.prototype.param1 = 1

s = new Singleton()

// add param2 to prototype
Singleton.prototype.param2 = 2

console.log(s.param1) // 1
console.log(s.param2) // undefined</code></pre>
But it has a huge drawback if you want to use prototype delegation. The problem is caused by the fact that the <em>s'</em>  prototype is originated from original constructor but not to the redefined. In order to overcome that we have to override new object's prototype with the old one. Also we can override constructor  to be able to check object constructor.
<pre class="language-js"><code>function Singleton(){
  var instance = this

  // rewrite the constructor
  Singleton = function(){
    return instance
  }

  Singleton.prototype = this
  // optional
  this.constructor = Singleton
}

// add param1 to prototype
Singleton.prototype.param1 = 1

s = new Singleton()

// add param2 to prototype
Singleton.prototype.param2 = 2

console.log(s.param1) // 1
console.log(s.param2) // 2

s.constructor === Singleton // true</code></pre>
<h2>Private members</h2>
If we need to hide internals of our object than we can use:
<ul>
  <li>Use a convention were all private members should start with an underscore</li>
  <li>Return a new object from constructor (which has access to function scope variables)</li>
  <li>Self invoking anonymous function which will return a Singleton object</li>
</ul>
Returning a new object from constructor and self invoking anonymous function are known as Module pattern because is modularizes and namespaces a set set of related methods and attributes. It is a simulation of private property. Both implementations have a drawback - we can't use anymore prototype delegation via Singleton constructor function. However we can assign new members to any Singleton object and it will accessible from all object variables (as it is the same instance). This example uses lazy initialisation as the constructor body will be executed only when an instance will be created.
<pre class="language-js"><code>function Singleton(){
  if(Singleton.instance !== undefined)
    return Singleton.instance

  var privateMember = 1

  // All public methods
  Singleton.instance = {
    getMember: function(){
      return privateMember
    }
  }

  return Singleton.instance
}

s = new Singleton()

s.privateMember // undefined
s.getMember() // 1
s2 = new Singleton()

s.newMember = 2
s2.newMember // 2</code></pre>
Self invoking anonymous function returns an object with some hidden members. So it is pure Module pattern.
<h2>CoffeeScript Singleton Pattern</h2>
We can simply translate JS into CoffeeScript.
This:
<pre class="language-coffeescript"><code>function Singleton(){
  if(Singleton.instance !== undefined)
    return Singleton.instance

  Singleton.instance = this
}</code></pre>
into this:
<pre class="language-coffeescript"><code>Singleton = ()-&gt;
  return Singleton.instance if Singleton.instance

  Singleton.instance = @

# testing
c = new Singleton()
d = new Singleton()
console.log c is d</code></pre>
In order to hide Singleton internals we can use classes closures:
<pre class="language-coffeescript"><code>class Singleton
  Singleton.instance = null
  # Private variable
  message = null

  # message is a private variable
  constructor: (message) -&gt;
    Singleton.instance ?= new PrivateClass(message)
    return Singleton.instance

  class PrivateClass
    constructor: (_message)-&gt;
      message = _message
    echo: -&gt; message

a = Singleton("Hello A")
console.log a.echo() # =&gt; "Hello A"

b = Singleton("Hello B")
console.log b.echo() # =&gt; "Hello A"</code></pre>
We can use a much simpler construction like:
<pre class="language-coffeescript"><code>class Singleton
  Singleton.instance = null

  constructor: () -&gt;
    Singleton.instance ?= @
    return Singleton.instance

a = Singleton()
b = Singleton()
console.log a is b # =&gt; true</code></pre>
We can hide Singleton instance by redefining constructor:
<pre class="language-coffeescript"><code>class Singleton

  instance = new @()
  # message is a private variable
  constructor: () -&gt;
    return instance

Singleton.prototype.p1 = 1
a = new Singleton()
Singleton.prototype.p2 = 2
b = new Singleton()

console.log a is b # =&gt; true
console.log a.p1 # =&gt; 1
console.log a.p2 # =&gt; 2</code></pre>
But in this case new constructor will be instantiated on Singleton definition. Also Coffee <em>extend</em> will not work anymore. In order to overcome it we may use an additional method that will return the instance:
<pre class="language-coffeescript"><code>class Singleton
  @instance: null
  @getInstance: -&gt;
    @instance ?= new @()

class SingletonChild extends Singleton
  newMethod: () -&gt;
    'result'

a = Singleton.getInstance()
b = Singleton.getInstance()

c = SingletonChild.getInstance()
d = SingletonChild.getInstance()

console.log a is b # true
console.log c is d # true
console.log a is c # false
console.log a.newMethod() # Object #&lt;Singleton&gt; has no method 'newMethod'
console.log c.newMethod() # result</code></pre>
The only benefit of this example over defining object using the literal syntax for object creation is CoffeeScript's syntactic sugar of class definition and ability to have hidden attributes and methods. But if you don't need all that you can do it in a much sore simple way by using plain objects:
<pre class="language-coffeescript"><code>Singleton =
  property: 1

SingletonChild = Object.create(Singleton)

SingletonChild.newProperty = 2

console.log Singleton.property         # 1
console.log SingletonChild.property    # 1
console.log Singleton.newProperty      # undefined
console.log SingletonChild.newProperty # 2</code></pre>
<h2>Sources</h2>
<ol>
  <li>(github) <a href="https://github.com/shichuan/javascript-patterns/blob/master/design-patterns/singleton.html" target="_blank">shichuan / javascript-patterns / design-patterns / singleton.html</a></li>
  <li>(book) <a href="http://www.amazon.com/First-Design-Patterns-Elisabeth-Freeman/dp/0596007124">Head First Design Patterns</a></li>
  <li>(book) <a href="http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript" target="_blank">Learning JavaScript Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/9780596806767.do" target="_blank">JavaScript Patterns: Build Better Applications with Coding and Design Patterns</a></li>
  <li>(book) <a href="http://shop.oreilly.com/product/0636920025832.do" target="_blank">Learning JavaScript Design Patterns: A JavaScript and jQuery Developer's Guide</a></li>
  <li>(book) <a href="http://www.amazon.com/Pro-JavaScript-Design-Patterns-Object-Oriented/dp/159059908X" target="_blank">Pro JavaScript Design Patterns: The Essentials of Object-Oriented JavaScript Programming</a></li>
  <li>(book) <a href="http://coffeescriptcookbook.com/" target="_blank">CoffeeScript Cookbook</a></li>
  <li>(article) <a href="http://www.2ality.com/2011/04/singleton-pattern-in-javascript-not.html" target="_blank">The Singleton pattern in JavaScript: not needed</a></li>
  <li>(article) <a href="http://kaijaeger.com/articles/the-singleton-design-pattern-in-javascript.html" target="_blank">The singleton design pattern in javascript</a></li>
  <li>(article) <a href="http://davidwalsh.name/javascript-objects-deconstruction" target="_blank">JS Objects: De”construct”ion</a></li>
  <li>(question) <a href="http://stackoverflow.com/a/10146007/1194327" target="_blank">How to create coffeescript singleton subclass</a></li>
</ol>
