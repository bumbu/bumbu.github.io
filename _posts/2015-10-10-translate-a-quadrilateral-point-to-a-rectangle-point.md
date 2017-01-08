---
title: Translate a quadrilateral point to a rectangle point
date: 2015-10-10T21:45:01+00:00
author: bumbu
layout: post
permalink: /translate-a-quadrilateral-point-to-a-rectangle-point/
categories: experiments
---
In <a href="http://bumbu.me/ghost-land-augmented-reality-game/" target="_blank">Ghost Land</a> we had a problem that the projector/beamer was projecting the image as a quadrilateral. So we need a translation from quadrilateral back to a rectangle (without that if you would hit the top-right corner, in game it would be translated more to the left). And with the help of <a href="https://github.com/Andreis13" target="_blank">Andrew</a> we got a solution.

In case that you need to translate a point from one quadrilateral to another (for example rectangle) in Java or Processing - you can use the source from <a href="https://github.com/9-volt/quadrilateral_translation" target="_blank">9-volt/quadrilateral_translation</a>.

Here is an example of points translation:

<img class="aligncenter size-full wp-image-767" src="{{site.root}}/assets/images/2015/10/quadrilateral-translation.png" alt="quadrilateral-translation" width="600" height="180" />
