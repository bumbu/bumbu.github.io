---
title: Fetch articles' urls from Google Reader
date: 2013-06-30T15:57:23+00:00
author: bumbu
layout: post
permalink: /fetch-articles-urls-from-google-reader/
categories: development experiments
---
Sometimes websites have no working archive section. This was the case with a website on which we were doing some research. Our solution was last day of Google Reader.

Google Reader keeps websites cache for some good time. We just have to extracti it from there. But as API is closed we'll do a dirty workaround.
<h2>1. Run Chrome with --disable-security-flag</h2>
We'll use it in order to overcome Same Origin policy
<h2>2. Run a server which will store data</h2>
Mine was running under http://localhost/keeper/
<pre class="language-php"><code>$entries = json_decode($_POST['entries']);

foreach ($entries as $entry) {
  file_put_contents('data.txt', $entry."\n", FILE_APPEND);
}</code></pre>
<h2>3. Open desired web page in Reader.</h2>
Set options (top panet) as Show all and Sort descending.

Now opent developer console and paste this code
<pre class="language-js"><code>// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length &gt;&gt;&gt; 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    A = new Array(len);
    k = 0;
    while(k &lt; len) {

      var kValue, mappedValue;
      if (k in O) {
        kValue = O[ k ];
        mappedValue = callback.call(T, kValue, k, O);
        A[ k ] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

function init() {
  var jq = document.createElement('script');
  jq.src = "http://code.jquery.com/jquery-latest.min.js";
  document.getElementsByTagName('head')[0].appendChild(jq);
  var interval = setInterval(function () {
    console.log('check for jQuery')
    // check if jQuery loaded. set it to noConflict
    if (jQuery !== undefined) {
      jQuery.noConflict();
      // stop checking for jQuery
      clearInterval(interval)
      startWorking()
    }
  }, 1000)

}

function startWorking() {
  console.log('start working')
  // Keep variables as global to have ability to change them during working
  window.baseTimeout = 2000
  window.url = 'http://localhost/keeper/'
  window.lastScroll = 0
  window.scrollDelta = 1000
  window.$container = jQuery('#viewer-entries-container')
  window.lastEntryId = 0
  window.$entry = jQuery('#entries')

  giveMeMore()
}

function giveMeMore () {
  // Get entries
  var entries = $.ea.slice(window.lastEntryId).map(function (a) {
    return a.Ub.dd
  })

  var $entries = window.$entry.find('.entry')

  if ($entries.length &gt; 30) {
    $entries.slice(0,$entries.length-3).remove()
    window.lastScroll = 0
  }
  // Scroll more
  window.lastScroll += window.scrollDelta
  window.$container.scrollTop(window.lastScroll)

  var timeout = ~~((Math.random() + 0.5) * window.baseTimeout)

  // Get previous data
  if ($.ea.length &gt; window.lastEntryId) {
    jQuery.ajax({
      url: window.url
    , type: 'post'
    , data: {'entries': JSON.stringify(entries)}
    , beforeSend: function () {
        window.lastEntryId = $.ea.length
      }
    , success: function (data) {
        setTimeout(giveMeMore, timeout)
      }
    })
  } else {
    setTimeout(giveMeMore, timeout)
  }

}

init()</code></pre>
4. Sit back and wait

In order to increase speed just type in console
<pre class="language-js"><code>window.baseTimeout = 1000</code></pre>
You can put a smaller number but take care as it has it's limits.
<h2>Update</h2>
In the end it turned out that previous solution was killing browser after ~10k articles.

I tried to remove DOM elements, but it turned out that there was a callback error for removed elements and it was killing browser even faster.

So while digging for another solution I found out that reader is still using old good API (initially I was confused as I thought that Reader recieves data as scripts that are executed). Using the same script with small modifications and <a href="https://code.google.com/p/pyrfeed/wiki/GoogleReaderAPI">explanation of how to do pagination</a> I was able to increase speed from 6k/h articles to 180k/h. So my task of getting links to 140k articles was done under 1 hour.

Here is the code (prototype.map and init functions stays the same):
<pre class="language-js"><code>function startWorking() {
  console.log('start working')
  // Keep variables as global to have ability to change them during working
  window.baseTimeout = 2000
  window.url = 'http://localhost/test4/'
  window.continuation = 'CJLR_ZGgibgC'

  giveMeMore()
}

function giveMeMore () {
  // Get entries
  jQuery.ajax({
    url: 'http://www.google.com/reader/api/0/stream/contents/feed/rss.xml?r=n&amp;n=20&amp;client=scroll'
  , type: 'get'
  , dataType: 'json'
  , data: {
      ck: new Date().getTime()
    , c: window.continuation
    }
  , success: function (data) {
      window.continuation = data.continuation

      if(data.items.length &gt; 0) {

        entries = data.items.map(function (a) {
          return a.alternate[0].href
        })

        jQuery.ajax({
          url: window.url
        , type: 'post'
        , data: {'entries': JSON.stringify(entries)}
        , success: function (data) {
            giveMeMore()
          }
        })
      }
    }
  })

}

init()</code></pre>
