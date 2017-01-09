---
title: Image font with in-browser and on-server rendering
date: 2015-04-02T18:18:28+00:00
author: bumbu
layout: post
permalink: /image-font-with-in-browser-and-on-server-rendering/
previewTitle: "InBrowser Image Font"
previewThumbnail: /assets/images/2015/04/image-font--thumbnail.gif
categories: experiments portofolio
---
This is a post about <a title="Mesaje Dulci" href="http://mesajedulci.suedzucker.md/" target="_blank">Mesaje Dulci</a> (sweet messages) - a single page website where you can write a <em>sweet</em> message using <em>sugar</em> fonts. It supports latin letters and some symbols. An example:

<img class="aligncenter wp-image-670 size-full" src="{{site.root}}/assets/images/2015/04/sweet-messages.jpg" alt="sweet-messages" width="700" height="525" />

Source code is available on <a href="https://github.com/bumbu/mesajedulci" target="_blank">GitHub</a>.
<h2>Symbols</h2>
First thing you need are symbols for your font. For this I got all 26 latin letters, 10 digits and 13 additional symbols (like !?.,-=). Each symbol is done from sugar (loose, cubes and bags), photographied and cut in graphical editor so that it is aligned right.

<img class="aligncenter wp-image-673 size-full" src="{{site.root}}/assets/images/2015/04/image-font-symbols.jpg" alt="image-font-symbols" width="583" height="120" />
<h2>Optimizing images</h2>
Original images are huge  - 1-2 Mb each image. Multiply it by 49 and you get a pretty heavy load for a simple single-page web site. So an obvious solution would be to minimize these images. As by design a maximum symbol height was 120 pixels. Scaling images and saving them as optimized JPEG (60%) resulted in images of 10-30Kb in size. This is really good.

But even if assets are small in size, having many of them will delay site usability. One of the solutions is to vertically sprite symbols. Vertical joining was chosen because some browsers (old Opera) had limit on maximal image width that could be used as sprite. But there is a drawback with this approach - because symbols have similar height but different width - sprite width will be equal to widest symbol in given set of symbols.
<h2>In-browser font render</h2>
Each symbol is represented in HTML as a span element with set width and height. Each span has an image (previously generated sprite image). When rendering symbols - application calculates necessary offset that should be applied to the image so that it would display necessary symbol.

<img class="aligncenter wp-image-674 size-full" src="{{site.root}}/assets/images/2015/04/symbol-source-code.jpg" alt="symbol-source-code" width="700" height="276" />

Each word is wrapped in another span so that if a word doesn't fit into a row - its letters would not break.
<h2>On-server font render</h2>
As on server we can load bigger number of files with almost no delay - individual symbol images are used. First symbols are joined in rows. Then rows are centered and joined into one image. This image is resized to a maximal allowed size. Resulting image is placed into a placeholder image of a specific size.

On-server renders are used for Facebook shares. When you share a URL on Facebook - you can preview the message.
<h2>Art</h2>
Art material (design and symbols) was done by  <a href="http://www.piko.md/" target="_blank">Piko</a> - a great creative agency with awesome people. Thank you for giving me an opportunity to work on an interesting project.
<h2>Ligatures</h2>
As some people are obsessed with typography (yep, Piko) few ligatures were added. You can see how neighboring LV symbols look as a ligature (left) and normally.

<img class=" size-full wp-image-675 aligncenter" src="{{site.root}}/assets/images/2015/04/ligatures.jpg" alt="ligatures" width="451" height="120" />
