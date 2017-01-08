---
title: Diploma ideas
date: 2011-09-13T21:13:10+00:00
author: bumbu
layout: post
permalink: /diploma-ideas/
categories: blog
---
<h3>Android Air WiFi</h3>
<div>Android application that will check the security of available WiFi networks. Its main test target will be getting access to WiFi.</div>
<div>Few technics/steps for trying to get into WiFi are (ascending order of complexity):</div>
<div>
<ul>
	<li>Use dictionary of default passwords for WiFi routers (a lot of people do not change default password provided by router)</li>
	<li>Use dictionary of X most popular passwords for WiFi (this list can be found on the internet)</li><!--more-->
	<li>Use algorithm for extracting the password from name of the network (very often ppl uses a password that is very similar to their network name; ex. writing network name with all lowercase letters)</li>
	<li>In case of weak secured networks, hack them (ex. there are algorithms for hacking WPA)</li>
	<li>Try to crawl information about person who created network in the internet[requires internet] (just googling network name can give some data as birth date or phone number that can be used for getting the password)</li>
	<li>Bruteforce</li>
</ul>
<div>Benefit: such an application can give to you good overview how secure is your WiFi network, also it can restore in most cases access to your WiFi without resetting the router.</div>
<div><a href="http://forum.xda-developers.com/showthread.php?s=9f58ee88776b8aa6236a8abd743b0f54&amp;t=508871&amp;page=4" target="_blank">link 1</a>, <a href="http://www.androidfanatic.com/community-forums.html?func=view&amp;catid=9&amp;id=1578" target="_blank">link 2</a></div>
</div>
<h3>Service of one click e-mail</h3>
<div>Develop a service that will give in one-click a temporary email.</div>
<div>This email service give only access to receive  emails. This is useful in cases when many services requires an e-mail address from you to accept your registration. But after some time, very often they start to spam you. So this service helps you to avoid such situations.</div>
<div>What should be done:</div>
<div>
<ul>
	<li>Back end part of a service (almost done)</li>
	<li>Front end(web) part of a service</li>
	<li>API</li>
	<li>Android application</li>
	<li>Mobile version</li>
	<li>(additional) Other platforms application</li>
</ul>
</div>
<h3>Chisinau city routing</h3>
<div>Android and web application for helping people to get as fast as possible to some specific place.</div>
<div>Specific characteristics of this system (many of them can be almost as Google service):</div>
<div>
<ul>
	<li>Done specifically for Chisinau city (with ability to modify for other cities)</li>
	<li>Take in account pedestrian roads</li>
	<li>Take in account car roads</li>
	<li>Take in account public transport</li>
	<li>Take in account time (at night there is not public transport, at different points of time, public transport has different schedule)</li>
	<li>Add ability for tracking data while traveling to have more precise data about pedestrian roads, public transport speed at different times, and public transport schedule.</li>
</ul>
<div>Main functions of this application should be:</div>
<div>
<ul>
	<li>Input start point and destination, and get possible ways to get to those place as fast and cheap as possible</li>
	<li>Guide you as long as you are on the way</li>
</ul>
</div>
<div>Note: this application will be very useful for ppl like me that know names for only 3 streets in Chisinau.</div>
<h3>Students share site</h3>
<div>Web site for students for sharing reports, examples, cheating.</div>
</div>
<h3>App for listing discounts for android apps</h3>
<div>Android app/service that will show discounts/bonuses/free apps that changed their status or just appeared.</div>
<h3>Music settings service</h3>
<div>Music service that will give best settings(equalizer) for different types of music.</div>
<div>It can work in 2 states:</div>
<div>
<ul>
	<li>genre precise (there is a set of settings for each genre of music)</li>
	<li>song precise (look in database for settings for this specific song, and in case if not found - use genre specific settings)</li>
</ul>
<div>This service is compound from 2 parts: database (online), and application or add-on for most popular music players.</div>
</div>
<h3>Joomla Shop component</h3>
<div>Why? Because there are few shop components for Joomla(especially latest version) that offer full functionality(as online payments, downloadable content, multiple and configurable options for products) , but all of them are shitty and old. Work with them is pain in the ass.</div>
<div>This component should be open source, and should follow Joomla code style and templating codex.</div>
<h3>Blackboard snapshoot</h3>
<div>Entire solution that will give ability using 2 web-cams (ideal case will be for one web-cam) that will record all introduced data on the table.  This data will be saved as vector elements situated in time. So in the end there will be possibility to save all the session as video, flash or other interactive formats.</div>
<div>How cameras will be situated: in two corners of a blackboard.</div>
<div>Other variation of snap-shooting blackboard content is putting camera perpendicular with blackboard, and processing the image.</div>
<div>One more option will be to have some online blackboard streaming.</div>
