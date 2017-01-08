---
title: Simple facebook test assignment is not so simple in fact
date: 2013-04-05T13:34:57+00:00
author: bumbu
layout: post
permalink: /simple-facebook-test-asignment-is-not-so-simple-in-fact/
categories: development
---
<h2>Given Problem</h2>
Input string: 33221
Output string: 322211

So you have to outup number + its repetitions in a row
<h2>Possible Solutions</h2>
First try, it took me 5 min and 2 iterations to make it working:
<pre class="language-php line-numbers"><code>$last = '';
$last_count = '';

$string = "4441";

foreach (str_split($string) as $index =&gt; $letter) {
  if($last != $letter){
    echo $last.($last_count);
    $last = $letter;
    $last_count = 1;
  }else{
    $last_count += 1;
  }

  if($index == strlen($string) - 1){
    echo $last.($last_count);
  }
}</code></pre>
This code has 2 main drawbacks:
<ul>
	<li>On first iteration it prints empty string (it is right but poor solution)</li>
	<li>It has 2 identical lines of code (line 8 and 16)</li>
</ul>
Spending 2 more minutes I did this:
<pre class="language-php line-numbers"><code>$last = '';
$last_count = 1;

$string = "33221";

if(strlen($string)){
  foreach (str_split($string) as $index =&gt; $letter) {
    if($index === 0){
      $last = $letter;
    }elseif($last != $letter){
      echo $last.($last_count)."\n";
      $last = $letter;
      $last_count = 1;
    }else{
      $last_count += 1;
    }
  }
  echo $last.($last_count)."\n";
}</code></pre>
Here again we have the same line repeating, but now it is outside the loop.

Trying to do it in a more functional way:
<pre class="language-php line-numbers"><code>error_reporting(E_ALL ^ E_STRICT);

$string = "33221";

$data = (object)array('last' =&gt; '', 'count' =&gt; 0);
array_walk(str_split($string), function($letter, $index, $temp){
  if($letter == $temp-&gt;last){
    $temp-&gt;count += 1;
  }else{
    if($temp-&gt;last) echo $temp-&gt;last.$temp-&gt;count;
    $temp-&gt;last = $letter;
    $temp-&gt;count = 1;
  }
}, $data);
if($data-&gt;last) echo $data-&gt;last.$data-&gt;count;</code></pre>
And one more way using static variables inside a function:
<pre class="language-php"><code>error_reporting(E_ALL ^ E_STRICT);

$string = "33221";

function checkPairs($letter = null) {
  static $count = 0;
  static $last = null;

  if($last == $letter){
    $count++;
  }elseif($last){
    echo $last.$count+1;
    $count = 0;
  }
  $last = $letter;
}

array_walk(str_split($string), function($letter, $index){
  checkPairs($letter);
});
checkPairs();</code></pre>
Here is a solution which will work only for unique groups:
<pre class="language-php"><code>$string = "33221";

$array = str_split($string);
$stack = array();
while($letter = array_shift($array)){
  if(isset($stack[$letter])){
    $stack[$letter] += 1;
  }else{
    $stack[$letter] = 1;
  }
}

foreach($stack as $letter =&gt; $count){
  echo $letter.$count;
}</code></pre>
