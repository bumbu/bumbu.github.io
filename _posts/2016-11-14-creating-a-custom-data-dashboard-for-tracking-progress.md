---
title: Creating a custom data dashboard for tracking progress
date: 2016-11-14T22:54:45+00:00
author: bumbu
layout: post
permalink: /creating-a-custom-data-dashboard-for-tracking-progress/
categories: blog
---
Say you want to build a number (say 200) of paper-planes in 3 months. Or you want to watch 200 movies. Or you want to solve 200 coding challenges. It is easy to think of that, but it's quite challenging to stay on track.

You may say that you're going to do 200/90 = 2 challenges/day (sometimes 3). But that's really not going to work well for most people. What if instead you'd have a graph that would look like:

<img src="http://bumbu.me/wp-content/uploads/2016/11/progress-graph-265x300.png" alt="Progress graph" width="265" height="300" class="alignnone size-medium wp-image-1047" /><img src="http://bumbu.me/wp-content/uploads/2016/11/progress-graph-tooltip-267x300.png" alt="Progression graph - Tooltip" width="267" height="300" class="alignnone size-medium wp-image-1050" />

Where the green line would represent _the plan_, blue line would represent actual progress, and the red line would represent the prediction based on last X (say 7) days. This gives a much better overview current situation. And as long the prediction line (red) is above the expected line (green) - you're on track. Whenever the red line is below, you know that you have to push a bit more.

## Full picture

Here's the entire dashboard:

<a href="http://bumbu.me/wp-content/uploads/2016/11/progression-dashboard.png"><img src="http://bumbu.me/wp-content/uploads/2016/11/progression-dashboard-1024x450.png" alt="Progression dashboard" width="640" height="281" class="alignnone size-large wp-image-1052" target="_blank" /></a>

On the left you can see overall progression progress.
On the right you can see the average progression during last 7 days, and the required average to finish your target on time.

## Storing the data

I wanted to have it very simple and fast. A Google Spreadsheets was a perfect solution for that (document data is public).

<a href="http://bumbu.me/wp-content/uploads/2016/11/data-source.png"><img src="http://bumbu.me/wp-content/uploads/2016/11/data-source-1024x510.png" alt="Google Spreadsheets as data source" width="640" height="319" class="alignnone size-large wp-image-1057" target="_blank"/></a>

## Dashboard platform

For the dashboard I was looking for something well-looking and with the functionality I wanted. As always - the functionality you want doesn't really exist and it's easier to write it by yourself (or so you think). Luckily I found [freeboard.io](https://freeboard.io) which is a SaaS that provides a platform for dashboards. They have few built-in data-sources and visualisation widgets, but the best part is that they allow you to write your own data-source widgets (perfect for pulling data from spreadsheets) and visualisation widgets (which allowed having a custom graph).

## Creating your own dashboard

It may be a bit confusing at the beginning, but it is fairly easy to create a dashboard for your own needs. In order to use Google Spreadshets as a data-source you'll need a custom widget. Luckily you can [use the one I wrote](https://github.com/bumbu/freeboard-plugins). You can also find a modified gauge widget and a wrapper for Highcharts.js in [my repo](https://github.com/bumbu/freeboard-plugins).

## Conclusion

If you have to commit to a daily set of tasks, monitoring your progress may be of a lot of help. You don't get any badges or _you're awesome_ messages, but you get an overview where is your progress, if you're still on track, and what should be your pace in order to meet the target.
