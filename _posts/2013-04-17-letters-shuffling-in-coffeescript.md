---
title: Letters shuffling in CoffeeScript
date: 2013-04-17T12:22:25+00:00
author: bumbu
layout: post
permalink: /letters-shuffling-in-coffeescript/
categories: experiments
---
Inspired by a friend who was learning JavaScript and playing with some effects, I took his version and optimized it. Here you can see how letters shuffle randomly on mouse hover, and on mouse out they come back.

<iframe style="width: 100%; height: 80px;" src="http://jsfiddle.net/bumbu/YtxTU/embedded/result/" height="240" width="320" frameborder="0"></iframe>

Letters are positioned absolutely, and the script that animate them is is CoffeScript:
<pre class="language-coffeescript line-numbers"><code># shuffle function
do -&gt; Array::shuffle ?= -&gt;
  for i in [@length-1..1]
    j = Math.floor Math.random() * (i + 1)
    [@[i], @[j]] = [@[j], @[i]]
  @

# global variables
$logo = $('#logo')
$letters = null

# on dom ready
$ -&gt;
  # get container's letters
  @letters = $logo.text().split(&quot;&quot;)

  # init new container html
  @html = &quot;&quot;

  # create all letters
  for i in [0..@letters.length-1]
    @html += &quot;&lt;i data-index='#{i}' style='left:#{i*0.5}em'&gt;#{@letters[i]}&lt;/i&gt;&quot;

  # insest letters in container
  $logo.html @html

  # cache letters
  $letters = $logo.children 'i'

$logo
  .mouseenter -&gt;
    # shuffle indexes
    shuffled_indexes = [0..$letters.length-1].shuffle()

    # animate letters to new positions
    $letters.each (index, letter) -&gt;
      position = shuffled_indexes[index]
      delta = (index - position)*0.5
      $(letter).stop(true).animate {left: &quot;-=&quot;+delta+&quot;em&quot;}, 500

  .mouseleave -&gt;
    # animate letters to old positions
    $letters.each (index, letter) -&gt;
      $letter = $(letter)
      delta = $letter.data('index')*0.5
      $letter.stop(true).animate {left: delta+&quot;em&quot;}, 500
</code></pre>
