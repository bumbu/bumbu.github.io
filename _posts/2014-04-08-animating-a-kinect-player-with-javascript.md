---
title: Animating a Kinect player with JavaScript
date: 2014-04-08T22:18:37+00:00
author: bumbu
layout: post
permalink: /animating-a-kinect-player-with-javascript/
categories: blog development experiments
---
It happened so that <a href="http://piko.md/">Piko Creative</a> was participating in <a href="http://www.noapteaagentiilor.ro/">Advertisers Night</a>. A friend of mine proposed to create a simple interactive animation using Kinect and their logo. Their logo represents a very simple men with just 5 joints. As I was left alone to do whatever I want - I did the part that was fun for me: research new toy and make it work.

<img class="alignleft size-full wp-image-611" alt="piko4" src="{{site.root}}/assets/images/2014/04/piko4.png" width="800" height="608" />

Overview of what was done:
<ul>
	<li>Select a programming language and tool</li>
	<li>Find a 2d physics library and a renderer</li>
	<li>Create the Piko (character)</li>
	<li>Connect Piko to Kinect</li>
	<li>Refactor and add ability to support multiple players</li>
</ul>
<h3>Selecting the programming language</h3>
Becaues I'm using JavaScript as my primary programming language it was an obvious decision to choose it as a visualisation language. Also I knew about other successful JS game powered by Kinect so I knew that it is possible to do quite easy (<a href="http://developkinect.com/resource/mac-os-x/kinect-virtual-disco-deathmatch-installation-guide" target="_blank">Kine Visual Disco Deathmatch</a>).
<h3>Physics library and renderer</h3>
<img class="size-full wp-image-603 alignleft" alt="piko2" src="{{site.root}}/assets/images/2014/04/piko2.gif" width="320" height="239" />I started with <a href="http://brm.io/matter-js/" target="_blank">Matter.js</a> as I've read about it and I wanted to try it out. It is a nice library but with poor functionality. Next choice was <a href="http://schteppe.github.io/p2.js/" target="_blank">P2.js</a> which is powerful enough library but it takes some time to add sprites to this library. While searching how to tweak p2.js I found <a href="http://phaser.io/" target="_blank">Phaser</a> - an HTML5 game library that was using as one of physics engines p2.js. But it has so many other features that it took less then one hour to do all the burden I was trying to achieve previously by myself. Phaser has builtin 3 different physics engines and as I experienced already p2.js it was an obvious choice.
<h3>Creating Piko and connecting to Kinect</h3>
<img class="alignleft size-full wp-image-608" alt="piko3b" src="{{site.root}}/assets/images/2014/04/piko3b.gif" width="320" height="244" />This was the time of dirty code. First I created the body and hands, added keyboard support for moving hands then added Kinect support for moving hands. When it was working I added legs and head. Moving members was achieved by changing rotation constraints. In order to have some limits for rotations a virtual rotation limit was created. So instead of directly changing rotation limits a proxy method was used which was checking for limits and updating accordingly.

<a href="https://www.codeandweb.com/physicseditor" target="_blank">Physics Editor</a> was used for outlining body parts.
<h3>Refactoring and supporting multiple users</h3>
Initially code was done just as a proof of concept, but then time for major changes came. I had to add multiple users support so I decided to do major refactoring. All the pieces were exported into modules. For application building Browserify was used. Each user has it's own instance and message listening and passing is done via an Observer so creating or removing players may be done on runtime.
<h3>Sources</h3>
You may find the code in <a href="https://github.com/bumbu/Piko-Kinectify" target="_blank">Github Piko Kinectify project</a>. A video demo is available <a href="https://www.youtube.com/watch?v=CvOIyR2JgSs" target="_blank">here</a>. A shortage <a href="https://www.youtube.com/watch?v=K68MGGk0tGQ" target="_blank">here</a>. And if you want to try how it works in browser without a Kinect than take a look <a href="http://bumbu.github.io/Piko-Kinectify/web/" target="_blank">here</a>.
