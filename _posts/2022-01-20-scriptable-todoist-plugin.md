---
title: Scriptable Todoist widget that selects a top task from a filter
date: 2022-01-20T10:00:00+00:00
author: bumbu
layout: post
permalink: /todoist-scriptable-plugin/
categories: development
---
<a href="https://scriptable.app/" target="_blank">Scriptable</a> is a great iOS app that allows you to crease custom widgets (or one-time scripts). You can use any service that exposes a public API to show the data in a custom format.

Todoist is a great task management app, but sometimes you may want to take away the decision process, and let someone else to choose a task to work on. The plugin bellow does just that:

* You give it a Filter name (that you define in Todoist app)
* The script will choose a random task from that Filter
* If your Filter has multiple sections, this script will prioritize the top section

This way you still control the "poll" of tasks, but the decision on which task exactly to focus on is done for you.

<script src="https://gist.github.com/bumbu/ce867650c7eb35b58c90f6e96dac970e.js"></script>
