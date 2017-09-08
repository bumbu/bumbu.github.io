---
title: 'ColemaRo - better Colemak for Romanian language'
date: 2013-04-05T00:23:11+00:00
author: bumbu
layout: post
permalink: /better-colemak-for-romanian-language/
categories: blog
---
Colemak is a great layout, but if you have to type letters with diacritics then you may feel like you're slowed down by them. Colemak tries to make everybody happy by using transformers (you type AltGr + [some key] of AltGr + [dead key] [some key] ). It is a necessary evil if you want to have access to all diacritics, but if you only care about few, then a better way is to have your layout customized. That should increase typing speed and typing pleasure.

Most often I type in English, with ocasional writings in <a href="http://en.wikipedia.org/wiki/Romanian_alphabet">Romanian (Română)</a>, and there are 2 main problems with it on Colemak:
<ul>
	<li><span style="line-height: 13px;">for 4 out 5 letters with diacritics I have to use 3 keys in order to get the desired character</span></li>
	<li>with Colemak it's impossible to have 2 letters (șț) as it supports cedilla, and not the comma-below</li>
</ul>
By searching a bit I understood that it will be faster and more efficient to remap these letters in order to get what I need.

<img class="alignleft size-full wp-image-347" alt="ColemaRo" src="{{site.root}}/assets/images/2013/04/ColemaRo.png" width="735" height="314" />

I remapped necessary letters like in the image above.

The idea behind such positioning is:
<ul>
	<li>I do need only these letters with diacritics, so I can break any other keyboard shortcuts for other diacritics (what actually happened)</li>
	<li>Each letter with a diacritic can be typed with 2 simultaneous key presses</li>
	<li>Letters "<em>ășțî"</em> are in the same place as respective letters without diacritics</li>
	<li>Letter "<em>ă"</em> can be additionally typed using letter "<em>r</em>". That is to allow easier typing of the caps letter by using left Shift key</li>
	<li>Letter "<em>â</em>" can de typed using letter "<em>e</em>" as it is next easiest available key to be pressed when holding AltGr</li>
</ul>

<h2>Windows version</h2>
Version for Windows was created using <em>Microsoft Keyboard Layout Creator.</em>

Source file and installation executables can be downloaded from <a href="http://goo.gl/IE2Iz">my drive</a>. The source file has <em>.klc</em> extension.

In order to type letters with diacritics press AltGr key + [mapped letter].

<h2>OS X version</h2>
First versions for OS X were created using <em>Ukelele</em>, later it was edited using standard text editor.

Keyboard layout and icon files can be downloaded from <a href="http://goo.gl/9Q5uiu" target="_blank">my drive</a>. You can install layout using one of 2 ways:
<ol>
	<li>Copy keyboard layout (ColemaRo) and icon (ColemaRo.icns) to <em>/Library/Keyboard Layouts/</em> or <em>~/Library/Keyboard Layouts/</em></li>
	<li>Create a bundle using Ukelele (it didn't work for me on OS X 10.8 and 10.9)</li>
</ol>
In order to type letters with diacritics press Alt key + [mapped letter].
