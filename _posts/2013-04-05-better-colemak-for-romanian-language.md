---
title: 'ColemaRo - better Colemak for Romanian language'
date: 2013-04-05T00:23:11+00:00
author: bumbu
layout: post
permalink: /better-colemak-for-romanian-language/
categories: blog
---
Colemak is a great layout, but if you have to type diacritics then you'll feel that something is wrong. Or it is not wrong, but there is no the same feeling of speed. Colemak tries to make everybody happy by using transformers (you type AltGr + [some key] of AltGr + [dead key] [some key] ). And that's the main problem. But when you know which diacritics you need, you can customize layout to increase typing speed and pleasure.

I'm usually typing in <a href="http://en.wikipedia.org/wiki/Romanian_alphabet">Romanian (Română)</a>, and there are 2 main problems with it on Colemak:
<ul>
	<li><span style="line-height: 13px;">for 4 from 5 letters I have to use 3 keys in order to get desired letter</span></li>
	<li>2 letters (șț) are wrong (Colemak has these letters only with cedilla, but they should be with comma)</li>
</ul>
By searching a bit I understood that it will be faster and more efficient to remap these letters in order to get what I need.

<img class="alignleft size-full wp-image-347" alt="ColemaRo" src="http://bumbu.me/wp-content/uploads/2013/04/ColemaRo.png" width="735" height="314" />

I remapped necessary letters like in image above.

The idea behind such positioning is:
<ul>
	<li><span style="line-height: 13px;">I do need only these letters with diacritics, so I can broke any other diacritic combinations (what I actually did)</span></li>
	<li>Letters should be writable by only 2 key presses</li>
	<li>Letters "<em>ășțî"</em> are in place of the same letters without diacritics</li>
	<li>Letter "<em>ă"</em> is doubled under letter "<em>r"</em> in order to type caps letter easier by using left Shift key</li>
	<li>Letter "<em>â"</em> is under "<em>e"</em> as it is next easiest available letter to type by holding AltGr</li>
</ul>
<h2>Windows version</h2>
Version for Windows was created using <em>Microsoft Keyboard Layout Creator.</em>

Source file and installation executables can be downloaded from <a href="http://goo.gl/IE2Iz">my drive</a>. Source file has <em>.klc</em> extension.

In order to type letters with diacritics press AltGr key + [mapped letter].
<h2>OS X version</h2>
First versions for OS X were created using <em>Ukelele</em>, later layout files where edited using standard text editor.

Keyboard layout and icon files can be downloaded from <a href="http://goo.gl/9Q5uiu" target="_blank">my drive</a>. You can install layout using one of 2 ways:
<ol>
	<li>Copy keyboard layout (ColemaRo) and icon (ColemaRo.icns) to <em>/Library/Keyboard Layouts/</em> or <em>~/Library/Keyboard Layouts/</em></li>
	<li>Create a bundle using Ukelele, but it didn't work for me on OS X 10.8 and 10.9</li>
</ol>
In order to type letters with diacritics press Alt key + [mapped letter].

But take in account that you still may need to have active at least one builtin keyboard layouts. It seems that it is not allowed to have active only removable layouts, and there is some logic in it.

&nbsp;
