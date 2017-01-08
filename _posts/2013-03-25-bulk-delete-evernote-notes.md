---
title: Bulk delete Evernote notes
date: 2013-03-25T21:13:36+00:00
author: bumbu
layout: post
permalink: /bulk-delete-evernote-notes/
categories: blog
---
I had +1400 notes in Evernote. Now I want them deleted. As I didn'd find any way to do a bulk delete of notes I decided to use the power of available tools: browser and knowledge.
<pre class="language-js"><code>var tryToDelete = function () {
      $('.selectedNoteDelete').first().click()
    }
  , confirmDelete = function () {
      $('#gwt-debug-confirm').click()
    }
  , notes = 100
  , timeout = 1000 // miliseconds
  , loop = function () {
      setTimeout(function(){
        tryToDelete()

        setTimeout(function(){
          confirmDelete()
          notes -= 1
          if (notes &gt; 0)
            loop()
        }, timeout)

      }, timeout)
    }

loop()</code></pre>
<strong>Take care - it will delete your notes and you may be not able to restore them. Also if used not properly it may do any other kind of harm.</strong>

In order to delete notes from a given notebook do:
<ol>
  <li><span style="line-height: 13px;">Open evernote in Google Chrome browser (it should work with any which allows you to run custom JavaScripts)</span></li>
  <li>Open notebook from which you want to delete notes</li>
  <li>Open Console (Ctrl+Shift+j on windows)</li>
  <li>Copy provided code</li>
  <li>Paste it into console</li>
  <li>Change notes and timeout</li>
  <li>Run code</li>
  <li>Wait until it's done</li>
</ol>
Depending on your internet connection, evernote responsiveness and your machine power you may increase or decrease timeout.  On my machine it was working well with timeout set to 250.

You may change timeout in realtime by passing into console new timeout value:
<code>timeout = 250</code>
In the same way you may check number of items left to delete checking notes value:
<code>notes</code>
In order to stop script (if you introduced to many notes, or something goes wrong and you don't want to refresh page) just run in console:
<code>notes = 0</code>
And back again, if your script finished working, but you need to run it for X more notes, you can write:
<pre class="language-js"><code>notes = 100
loop()</code></pre>
