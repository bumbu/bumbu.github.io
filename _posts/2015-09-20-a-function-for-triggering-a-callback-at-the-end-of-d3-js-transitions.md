---
title: A function for triggering a callback at the end of D3.js transitions
date: 2015-09-20T14:49:41+00:00
author: bumbu
layout: post
permalink: /a-function-for-triggering-a-callback-at-the-end-of-d3-js-transitions/
categories: development home
---
If you're using D3 for animations/transitions then you'll find often yourself in need of a way to trigger events in sequence. Making it work with one transition is quite easy. Listening for the end of multiple transitions is also easy. But why bother writing the same function multiple times if you can simply use this snippet:
<script src="https://gist.github.com/bumbu/dd5cb25a8762a0cab855.js"></script>
