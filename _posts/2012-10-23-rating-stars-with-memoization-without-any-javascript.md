---
title: Rating stars with memoization without any JavaScript
date: 2012-10-23T09:25:33+00:00
author: bumbu
layout: post
permalink: /rating-stars-with-memoization-without-any-javascript/
categories: experiments
---
<a href="{{site.root}}/assets/images/2012/10/rating_stars.png"><img class="alignright size-full wp-image-263" title="rating_stars" src="{{site.root}}/assets/images/2012/10/rating_stars.png" alt="" width="150" height="92" /></a>The idea is pretty simple - a rating element that will:
<ul>
  <li>Display simple and clear (we'll use stars)</li>
  <li>Display general state of rating</li>
  <li>Be interactive</li>
  <li>Have memoization (will remember last choice)</li>
  <li>Keep value in input for future submit by form</li>
</ul>
<h3>Step 1: Creating interactive stars wireframe</h3>
We'll use a container that will have inside overall progress of rating, and one element for each star.
<pre class="language-html line-numbers"><code>&lt;div class="stars"&gt;
  &lt;div class="rating" style="width:65%"&gt;&lt;/div&gt;
  &lt;i&gt;&lt;/i&gt;
  &lt;i&gt;&lt;/i&gt;
  &lt;i&gt;&lt;/i&gt;
  &lt;i&gt;&lt;/i&gt;
  &lt;i&gt;&lt;/i&gt;
&lt;/div&gt;</code></pre>
with styles
<pre class="language-css line-numbers"><code>.stars{
  width: 130px;
  height: 26px;
  background: url(http://sandbox.bumbu.ru/ui/external/stars.png) 0 0 repeat-x;
  position: relative;
}

.stars .rating{
  height: 26px;
  background: url(http://sandbox.bumbu.ru/ui/external/stars.png) 0 -26px repeat-x;
}

.stars i{
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 26px;
  width: 130px;
  cursor: pointer;
}
.stars:hover i{
  display: block;
}
.stars i:hover{
  background: url(http://sandbox.bumbu.ru/ui/external/stars.png) 0 -52px repeat-x;
}

.stars i + i{width: 104px;}
.stars i + i + i{width: 78px;}
.stars i + i + i + i{width: 52px;}
.stars i + i + i + i + i{width: 26px;}</code></pre>
Actually here each italic element (&lt;i&gt;) isn't quite one star. In order to make hovering stars to behave as each star knows about previous one, each italic element is a group of  stars.

The result will look like this:

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/bumbu/rXWpy/1/embedded/result/" width="320" height="240" frameborder="0"></iframe>
<h3>Step 2: Use input elements for value storage</h3>
In this case we'll need radio inputs as they have property to keep only one value at one given time. And as we cann't style input values in all browsers, we'll use labels for this.

Replacing italic elements with labels:
<pre class="language-html line-numbers"><code>&lt;div class="stars"&gt;
  &lt;div class="rating" style="width:65%"&gt;&lt;/div&gt;
  &lt;label for="star5"&gt;&lt;/label&gt;
  &lt;label for="star4"&gt;&lt;/label&gt;
  &lt;label for="star3"&gt;&lt;/label&gt;
  &lt;label for="star2"&gt;&lt;/label&gt;
  &lt;label for="star1"&gt;&lt;/label&gt;
  &lt;div class="radios"&gt;
    &lt;input type="radio" name="rating" id="star1" value="1"&gt;
    &lt;input type="radio" name="rating" id="star2" value="2"&gt;
    &lt;input type="radio" name="rating" id="star3" value="3"&gt;
    &lt;input type="radio" name="rating" id="star4" value="4"&gt;
    &lt;input type="radio" name="rating" id="star5" value="5"&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
The style for this is the same as in previous example, but all italic elements where replaced with label elements.

Now when we choose any element, the corresponding radio element will be marked as checked (later we'll hide radio inputs).

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/bumbu/rXWpy/2/embedded/result/" width="320" height="240" frameborder="0"></iframe>
<h3>Step 3: Display visually which star is selected</h3>
In order to do that we'll use pseudo property <em>:checked</em> of radio inputs (that's why this step will not work in old browsers).

We have to order elements in such a way that input is followed by its label.
<pre class="language-css line-numbers"><code>&lt;div class="stars"&gt;
  &lt;div class="rating" style="width:65%"&gt;&lt;/div&gt;
  &lt;input type="radio" name="rating" id="star5" value="5"&gt;
  &lt;label for="star5"&gt;&lt;/label&gt;
  &lt;input type="radio" name="rating" id="star4" value="4"&gt;
  &lt;label for="star4"&gt;&lt;/label&gt;
  &lt;input type="radio" name="rating" id="star3" value="3"&gt;
  &lt;label for="star3"&gt;&lt;/label&gt;
  &lt;input type="radio" name="rating" id="star2" value="2"&gt;
  &lt;label for="star2"&gt;&lt;/label&gt;
  &lt;input type="radio" name="rating" id="star1" value="1"&gt;
  &lt;label for="star1"&gt;&lt;/label&gt;
&lt;/div&gt;</code></pre>
Add to the css this property:
<pre class="language-css line-numbers"><code>.stars input:checked + label{
  display: block;
  background: url(http://sandbox.bumbu.ru/ui/external/stars.png) 0 -52px repeat-x;
}</code></pre>
Now our rating should look like this:
<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/bumbu/rXWpy/3/embedded/result/" width="320" height="240" frameborder="0"></iframe>
<h3>Final step</h3>
The only thing that we have to do now is to hide inputs. So the result will look like this:
<iframe style="width: 100%; height: 100px;" src="http://jsfiddle.net/bumbu/rXWpy/5/embedded/result,html,css/" width="320" height="240" frameborder="0"></iframe>
