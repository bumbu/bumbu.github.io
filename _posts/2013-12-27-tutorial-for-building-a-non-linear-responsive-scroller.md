---
title: Tutorial for Building a Non-linear Responsive Scroller
date: 2013-12-27T17:19:08+00:00
author: bumbu
layout: post
permalink: /tutorial-for-building-a-non-linear-responsive-scroller/
categories: development experiments
---
<h2>What Will We Build</h2>
The whole title would be: Developing a jQuery powered curved-path infinite responsive scroller. But there are too many words, so lets break it down into pieces. We will build:
<ul>
	<li>A scroller;</li>
	<li>An infinite scroller - you can scroll both ways infinitely, when there are not enough elements on one side - we'll borrow them from the other side;</li>
	<li>A jQuery based scroller - we'll use jQuery selector, animation, sizes retrieval and css setters;</li>
	<li>A scroller with non-linear/curved (<em>easeInSine</em>) movement path;</li>
	<li>A scroller with non-linear (<em>easeInOutBack</em>) easing;</li>
	<li>A scroller which can be scrolled by clicking on arrows or on elements itself;</li>
	<li>A scroller with each element having 2 images: default and active;</li>
	<li>A scroller with central element with different styling (active element);</li>
	<li>A responsive scroller - on page resize it will adjust number of visible elements and spacing between them.</li>
</ul>
To make things more clear we'll build this:

<a href="http://bumbu.me/wp-content/uploads/2013/12/scroller.png"><img class="alignnone size-large wp-image-577" alt="scroller" src="http://bumbu.me/wp-content/uploads/2013/12/scroller-1024x222.png" width="640" height="138" /></a>

&nbsp;
<h2>Planning and Building HTML/CSS Skeleton</h2>
You may start building a scroller in many different ways, but it seems to be easier first to do all HTML/CSS so to be able to see visual result first, and then work on JS part.

This can be done in many ways, but one of the most popular (and probably efficient) is to have one container of fixed sizes with <em>overflow:hidden</em> and inside of it another container which fits all the elements in one row. Inner container is positioned absolutely in relation to its parent.

In following image red rectangle is inner container. Green rectangle is main container. Inner elements are depicted as blue circles.

<a href="http://bumbu.me/wp-content/uploads/2013/12/scroller-scheme.png"><img class="alignnone size-full wp-image-581" alt="scroller-scheme" src="http://bumbu.me/wp-content/uploads/2013/12/scroller-scheme.png" width="683" height="123" /></a>

It is an efficient solution because while scrolling we have to change only inner container <em>left</em> value. Other solutions would imply to manipulate with each element independently but it is cumbersome and it is very likely to have unsynchronised animation where some elements will move faster then others. It will look awful.

All the other things may be done in whatever way. But one important thing is to keep elements horizontal margin unset because we'll use these margins to balance elements to fill visible space evenly.

In following examples I'll use only 2 images: default and active, but in real world version you can set custom images for each element.

<img class="alignnone size-full wp-image-582" alt="scroller_image_active" src="http://bumbu.me/wp-content/uploads/2013/12/scroller_image_active.png" width="99" height="102" /> <img class="alignnone size-large wp-image-583" alt="scroller_image_default" src="http://bumbu.me/wp-content/uploads/2013/12/scroller_image_default.png" width="99" height="102" />

For me the final result of HTML+CSS looks like:

<iframe src="http://jsfiddle.net/bumbu/fBY2d/embedded/result,html,css/" height="200" width="100%" frameborder="0"></iframe>
<h2>Adding Responsiveness</h2>
In order to make our scroller responsive we have to do following things:
<ol>
	<li>Find max available visible space;</li>
	<li>Compute how many odd elements may fit in visible space;</li>
	<li>Compute what should be the spacing between fitting elements in order to fill whole visible space;</li>
	<li>Set margins for elements based on previous point;</li>
	<li>Update inner container width to fit all elements in one row.</li>
</ol>
Here are 2 things to mention:
<ul>
	<li>All these steps should be performed whenever main container width is changed (on page resize);</li>
	<li>We need odd number of visible elements because in our case scrolling arrows should be around central element, so it should be only one central element.</li>
</ul>
By doing all these things we'll end up with something like this:

<iframe src="http://jsfiddle.net/bumbu/fBY2d/1/embedded/result,js/" height="200" width="100%" frameborder="0"></iframe>

Here are few things to mention:
<ul>
	<li>Inner container width is set as 150% of minimum necessary to fit all elements in one row. It is done in order to have some free space for elements that we'll clone and add into container on later steps;</li>
	<li>We didn't create a classical jQuery plugin, we'll have just 2 functions and some variables. But it may be a good idea to transform this thing into a plugin if you want to reuse it or maintain.</li>
</ul>
<h2>Adding Basic Scrolling</h2>
In order to add basic scrolling we have to calculate new inner-container position and scroll to it. Also here we'll add hooks for <em>onclick</em> event. When clicking on arrow - scroller will move by one position. When clicking on element - scroller will center given element. The code for it may look like:

<iframe src="http://jsfiddle.net/bumbu/fBY2d/2/embedded/result,js/" height="200" width="100%" frameborder="0"></iframe>

In fact this example works not really well when using arrows as it doesn't keep track of current position. But as for now we'll ignore it as we'll overcome this in next step. Also as you can see if you'll click on element from edge then you'll end up with empty space on the side of this element. In plugins without infinite scroll it is there is a limit on scrolling so that you'll not end up with empty space. In our case we'll implement infinite scrolling so we're going to solve this next.
<h2>Infinite Scrolling</h2>
Infinite scrolling is done quite easily - when there are not enough elements on one side, before scroll starts elements from the other side are cloned and after scroll ends clone originals are removed. It is also possible to optimise this process by repositioning elements when needed (if it possible) but it adds complexity so we'll skip this step. In fact we'll always clone elements so we don't have to check if we need to clone elements. Also this way we don't need to keep track of scroll offset as it will be always 0.

It may be implemented like this:

<iframe src="http://jsfiddle.net/bumbu/fBY2d/3/embedded/result,js/" height="200" width="100%" frameborder="0"></iframe>

You may see now that scrolling is working perfectly. In fact now we have a basic infinite scroller. There are lot of them on internet if you want to see other examples. So what we did in this step is:
<ol>
	<li>If scroll to:
<ol>
	<li><em>left</em>: clone last X elements and prepend them into inner container, offset inner container with the prepended elements width so it will look like with no changes;</li>
	<li><em>right</em>: clone first X elements and append them into inner container, compute animation offset;</li>
</ol>
</li>
	<li>Animate scrolling using css' left property:
<ol>
	<li><em>left</em>:  animate to 0px;</li>
	<li>right: animate to previously computed offset;</li>
</ol>
</li>
	<li>On animation complete:
<ol>
	<li>Remove clone originals;</li>
	<li>Set scroller left offset as 0px.</li>
</ol>
</li>
</ol>
<h2>Add active elements</h2>
To match given template we need to style centered element differently. For this I previously added a different <i>CSS</i> rule for elements that have <em>active</em> class. We only need to add <em>active</em> class to centered element and remove it from previously active element.

<iframe src="http://jsfiddle.net/bumbu/fBY2d/5/embedded/result,js,css/" height="200" width="100%" frameborder="0"></iframe>
<h2>Add custom scroll function</h2>
For animation we used built in <i>swing</i> function that is build in jQuery. There are many others built in jQueryUI, and we'll use 2 of them: <em>easeInOutBack</em> and <em>easeInSine</em>. In order not to add whole jQueryUI we'll extend <em>$.easing</em> object with necessary functions. This way we can add any animation function we need.

<iframe src="http://jsfiddle.net/bumbu/fBY2d/6/embedded/result,js/" height="200" width="100%" frameborder="0"></iframe>
<h2>Add vertical movement</h2>
Now let's get our hands on <em>non-linear</em> part of scroller. If you'll look closer to provided template you'll see that elements that are in the center are pushed a little bit to bottom. To be exactly centered element has a 30px top margin. It will be good to keep the same virtual curve line of elements while it is scrolling. In order to do that we'll use <em>step</em> animation function which is called for each <em>CSS</em> property on each jQuery animation step. As first argument this function receives <em>CSS</em> property value. It should look like:

<iframe src="http://jsfiddle.net/bumbu/fBY2d/7/embedded/result,js/" height="240" width="100%" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

In order to see how it looks with 5 elements or more (depending on you screen size) open <a href="http://jsfiddle.net/bumbu/fBY2d/7/embedded/result/" target="_blank">this example</a> or you can open JSFiddle and add more elements.

What we did here is:
<ul>
	<li>Define a maximal top margin (30px in our case);</li>
	<li>Use a easing function which matches our virtual path (easeInSine in our case);</li>
	<li>On each animation step compute each element top margin.</li>
</ul>
<h2>One animation at a time</h2>
If your'e insistent enough you managed to click fast multiple time on an arrow. You may see that there is a problem with that. This is because we don't keep track of animation state. If we wouldn't use cloning and adding new elements into our inner container then we could simply set animation's <em>queue</em> parameter as false. This would stop active animation if a new one would be requested.

In our case we'll simply use a lock - a boolean variable which will be checked before starting animation. If lock is active this means that there is another animation performing and we'll do nothing. It lock is free then we'll activate lock, perform our animation and we'll release the lock when animation will be finished.

<iframe src="http://jsfiddle.net/bumbu/fBY2d/8/embedded/result,js/" height="240" width="100%" frameborder="0"></iframe>

This is one of simplest solutions. Other variations would have a queue so that if an animation lock is active, next action is sent into queue. When animation is done, it is checking for queue, and if there is something - it is executing it. We can even get rid of lock, push all animations requests in queue and use queue length as lock.

&nbsp;
<h2>Using CSS3 Transitions</h2>
In order to make use of built-in-browser animations accelerations we may use <em>transition</em> <em>CSS3</em> property. But there is a problem with that - there are limited number of default <em>timing functions</em>. However there is <em>cubic-bezier</em> timing function which allows building custom functions. An example of function that is approximately like <em>easeInOutBack</em> is <a href="http://cubic-bezier.com/#.6,-0.37,.43,1.36" target="_blank">cubic-bezier(.6,-0.37,.43,1.36)</a>. Such approach will save us some code and should work much smoother on many machines.

<iframe src="http://jsfiddle.net/bumbu/wY5p5/1/embedded/result,js/" height="200" width="100%" frameborder="0"></iframe>

Here you can see that <em>CSS3</em> transition was added to inner container that has <em>transition</em> class. It was done in order to be able to change inner container offset instantly after we prepend new elements. But now we lost top margins. So we'll do the same for margins: we'll use the same transition function and we'll set only final margin so browser will compute for us all animation steps.

<iframe src="http://jsfiddle.net/bumbu/wY5p5/2/embedded/result,js/" height="240" width="100%" frameborder="0"></iframe>

For compatibility it is possible to combine both methods (jQuery and CSS3 animations).
<h2>Other Optimisation Techniques</h2>
There is still room for experimenting and improvements. One of such improvement may be usage of <em>requestAnimationFrame</em> for smoother jQuery animation. Other improvement is cloning elements only when needed.
