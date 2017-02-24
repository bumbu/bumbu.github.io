---
title: Website visual diffing
date: 2016-11-21T18:40:47+00:00
author: bumbu
layout: post
permalink: /website-visual-diffing/
previewTitle: "Website Visual Diffing"
previewDescription: "Regresion testing using website screenshots"
previewThumbnail: /assets/images/2016/11/visual-diff-differences--thumbnail.jpg
previewType: browser
categories: development experiments portofolio
---
If you ever worked with CSS/HTML then most probably you had the situation when you were supposed to change one thing, but in fact your changes affected other parts of the website (other elements or elements on other pages).

There are many factors that lead to these problems:

* CSS doetn's have modules/namespaces - basically any definition is global. And if you don't have some simulation of namespaces and modules (e.g. [BEM](https://en.bem.info/)) then it becomes very hard to control the code
* Many developers seem to ignore the fact that front-end code needs testing (or is testable). Which is especially currious when it comes from back-end developers who have a strong culture of writing tests for back-end code.
* Front-end often changes fast and often. Every project tends to have an infinite number of _small_ adjustments.

## Websites' front-end tests

Websites' front-end tests can be split into:

* Unit tests - ujualy useful for JavaScript code
* Functional/E2E tests - checking that different scenarios work as expected
* Accessibility tests - contrasts, keyboard navigation, hands-free navigation, voice-over...
* Visual tests - things look as you expect (includes colors, positions, hover states, open states)

These are split by the frequency of use. Most modern projects tend to have unit tests - they are easiest to write and reason about. E2E (end-to-end) tests require more set-up but bring the most value as they collateraly test how units function (aka a higher-levet unit-testing) and can cover some accessibility aspects. Often if you see accessibility tests - those are easier to integrate with E2E tests.

And for visual tests - those are most often done manually. And as industry proves - there are many things that when done manually are much slower and more error-prone compared to a computer. And this one is also one of those cases.

## Visual diffing

One way (and IMHO the simplest way) of doing visual testing is through visual diffing. The concept is super simple:

* You have a state you want to achieve/maintain (STABLE)
* Whenever there are changes - those are checked against the STABLE state

## Visual diffing example

Let's go through an example.

### Setting up the project

First we have to set up the project. Take a look at the [demo project](https://github.com/bumbu/visual-diff-demo). It is bacisally a gulp script that uses `website-visual-diff` module. You have to set up:

* `urlBase` - your project URL
* `baseFolder` - the folder where the screenshots will be saved
* `sizes` - an array of browser sizes
* `pages` - an array of pages to make screenshots of

It is important to take into account that specifing 5 sizes and 10 pages will result in 50 screenshots.

### Stable version screenshots

Now when we have the project set-up - we can make screenshots of how the website looks in current version.
For that we run `gulp diff:cache`. It should start making screenshots and showing which pages are currently under processing.

<img src="{{site.root}}/assets/images/2016/11/visual-diff-caching.png" alt="visual-diff-caching" width="394" height="260" class="alignnone size-full wp-image-1065" />

After the process is done you should get a bunch of files in `original` folder.

<img src="{{site.root}}/assets/images/2016/11/visual-diff-files.jpg" alt="visual-diff-files" width="716" height="309" class="alignnone size-full wp-image-1067" />

### Website changes

After having STABLE version screenshots you can start making changes. Let's say you changed some padding to a block. You have to check that you change didn't affect anythin you didn't expect. In my example I changed the padding of a section on jobs page.

### Changes diffing

After you made some changes - you should normally test your work. Manually you can test only a limited amount of pages and resolutions (time is costly - right?). Instead now we can just run the script to check for us which pages changed. To do that we run `gulp diff:compare`.

We should see again that the script makes screenshots, and when it's done with making screenshots - it will start comparing STABLE with current version:

<img src="{{site.root}}/assets/images/2016/11/visual-diff-compare.jpg" alt="visual-diff-compare" width="388" height="410" class="alignnone size-full wp-image-1068" />

It tells us that actually we didn't alter only one page, but all of them! Well, except for the jobs page on mobile devices. And actually even more than that - we can see what actually changed on those pages.

<img src="{{site.root}}/assets/images/2016/11/visual-diff-differences.jpg" alt="visual-diff-differences" width="883" height="307" class="alignnone size-full wp-image-1069" />

In this image we can see that the page header also moved. Now we know that we changed things that we were not suposed to. We should adjust our changes, and run visual diffing again (only the comparison part) until we get the desired results.

## Other visual diffing use-cases

Some other use cases:

* You can use original designs as STABLE (_source of truth_) for your website (sort of TDD)
* You can use the tool simply to make screenshots of how your website looked on each commit (or when branches got merged into master)
* Making screenshots of entire pages may be costly, and diffing them may be even more costly. So instead of making and comparing screenshots of entire pages - you could do that for specific elements (e.g. header, footer, sign-in button...) using [PhantomCSS](https://github.com/Huddle/PhantomCSS).

## Visual diffing presentation

Here is my presentation about the tool that I did:

<iframe width="560" height="315" src="https://www.youtube.com/embed/bvoXWQiOdxM" frameborder="0" allowfullscreen></iframe>

## Resources

* [bumbu/website-visual-diff](https://github.com/bumbu/website-visual-diff)
* [bumbu/visual-diff-demo](https://github.com/bumbu/visual-diff-demo) a demo project
* [PhantomCSS](https://github.com/Huddle/PhantomCSS) diffing elements instead of entire pages
* [Percy](https://percy.io/) Visual integration provided as SaaS
