---
title: "Preparing for Facebook engineering/front-end interview"
date: 2017-09-16 12:00:00 +0000
layout: post
permalink: /facebook-engineering-interview
categories: blog learning home
og_image: $/whiteboard-coding.jpg
og_image_alt: "Whiteboard coding"
og_description: "A guide on how to prepare for an engineering interview (including front-end) for Facebook (and other big companies like Google, Amazon...). It is based on my experience and the experiences of a dozen people that shared it with me."
comments: true
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}
{% capture caption_1 %}_Illustration by [Chip](https://instagram.com/Rian.pie){: target="_blank"}_{: class="caption"}{% endcapture %}

This article is a guide on how to prepare for an engineering interview (including front-end) for Facebook (and other big companies like Google, Amazon...). 
It is based on my experience and the experiences of a dozen people that shared it with me. 

It is in no way an official guide, and if you do everything written in here - it doesn't mean that you'll automatically get the job. But it will increase your chances considerably.

Before you read this article, go and check the official ["Preparing for your Software Engineering Interview at Facebook"](https://www.facebook.com/careers/life/preparing-for-your-software-engineering-interview-at-facebook/){: target="_blank"} page. It describes very well the interview timeline and what to expect at each step.

This article is an addition to the official guide and is focused mostly on coding questions preparation. 
At the end you'll find a step-by-step guide on [how to practice](#how-to-practice). 

Let's begin!

## Brush-up on your knowledge

![Brush-up on your knowledge illustration]({{ assets_path }}/brush-up-your-knowledge.jpg)
{{caption_1}}

Without knowing the basics - you're not going to get far in the interview process. 
So it's a good idea to revisit fundamental computer science concepts. 
But it will be different based on your experience and skill set:

* **Recent graduates**: revisit algorithms and data structures. Learn [system design][system-design-course]{: target="_blank"}
* **For experienced**: revisit algorithms, data structures, system design and your domain of expertise 
* **For front-enders**: revisit algorithms, data structures, JS and product design

### Algorithms and Data Structures

You'll get asked about some algorithms and data structures in any case. 
It can be a coding question or finding the complexity (big O notation) of a piece of code.
In fact, even if you don't get asked about time or space complexity - it's good to mention them for all solutions you provide. 

For algorithms and data structures you can pick any of the following books: 

* [Cracking the Coding Interview][cracking-the-coding-interview]{: target="_blank"}
* [Introduction to algorithms][introduction-to-algorithms]{: target="_blank"}
* [The Algorithm Design Manual][the-algorithm-design-manual]{: target="_blank"} 

I recommend [Cracking the Coding Interview][cracking-the-coding-interview]{: target="_blank"} because:

* It teaches you how to think about coding questions
* It covers very well the main algorithms and data structures
* It has solutions (Java in the book, a dozen of languages [here](https://github.com/careercup/CtCI-6th-Edition){: target="_blank"})
* It also has hints that you can use when you get stuck but don't want to check the provided solution yet

### Front-end specifics

For Front-end engineering positions, you have to know JavaScript very well (surprise!). 
You'll get asked JavaScript questions such as prototype chain, scopes, closures, primitives... 
Don't skip on ES6 (ES2015) and beyond features as many of these are _de facto_ standard in the industry.

You'll find [JavaScript Garden][js-garden]{: target="_blank"} to be a good memory refresher. 
Also [Eloquent JavaScript][eloquent-js-book]{: target="_blank"} ([free online][eloquent-js-online]{: target="_blank"}) covers basic DOM APIs pretty well and has some practical exercises to test your knowledge.

### Product Design for Front-enders

It is easy to confuse Product Design with drawing interfaces, but in fact you're asked how would you build products from a high-level perspective. You get asked questions like:

* "How would you implement a news-feed (which has only posts of text and pictures)?"
* "How would you implement a photos album?"

These are very vague questions, that's why you should have a dialogue with your interviewer for the entire time. 

I haven't yet found any good resources on product design, but it follows the same pattern as the system design:

* Ask questions and clarifications on vague bits
* Make assumptions and state them where you don't have enough information
* Provide multiple possible solutions starting with the most obvious one
* Make it a dialogue, and the interviewer will guide you through your assumptions

## Practice whiteboard coding 

![Whiteboard coding illustration]({{ assets_path }}/whiteboard-coding.jpg)
{{caption_1}}

You may think - well, I've written code for X years, so I'll have no trouble writing some code on a whiteboard. 
But if you never did it before, you may be surprised how different it is.
No highlighting, no linting, no auto-complete and you can't run it. 
And editing 2 lines above is just painful. 

You can practice your skills on some paper, notepad editor or some on-line [coding platforms](https://www.interviewbit.com){: target="_blank"} (that have added benefit of tests). 
You may be tempted to run your test cases immediately after writing your code, please don't do this. 
First try to check a few use cases by hand, as you'll need to do this in the interview.

Try it now:

> Implement a function to check if a singly linked list is a palindrome. Use constant space.

## Learn and practice how to approach and solve a given coding question

All the above things are important, without them you have little chance of success, but these things may not be enough. 
It's not enough to provide a complete solution for a coding question. Actually you may pass even if you don't provide a complete or ideal solution. 
What matters most is the way you think. 
And that's why I think a lot of people that have enough knowledge fail. 

Let me repeat: **It is more likely that you'll pass the interview if you communicate and show the way that you think, rather than providing a complete and perfect solution**. 
And this is a skill that can be _easily_ trained. 

The book that helped me a lot to prepare for the interview, and actually made me a better engineer is [Cracking the Coding Interview][cracking-the-coding-interview]{: target="_blank"}. 
If you don't intend to read the book (although I highly recommend you do) then the most important piece of information is the skills diagram:

[![Skills Diagram]({{ assets_path }}/skills-diagram.png)][cracking-the-coding-skills-diagram]{: target="_blank"}

_you can get a [PDF version here][cracking-the-coding-skills-diagram]{: target="_blank"}_

## How to practice

Now that you know what to expect from the interview, it's time for **practice**. 
Depending on your skills it may take you anywhere between a week and few months. 

The key is **consistency**. 
Carve some time **every evening** and solve one exercise. 
It's more efficient than solving 20 exercises during the weekend and then forgetting about it during the week. 

### With [Cracking the Coding Interview book][cracking-the-coding-interview]{: target="_blank"}:

1. Go through introductory chapters
1. [Skills diagram][cracking-the-coding-skills-diagram]{: target="_blank"} is available in the book but I found it easier to have it printed and hanged on the wall
1. Practice coding questions
1. Check hints when you're stuck or you think that you nailed it (there may be a better solution)
1. Always follow the diagram
1. Always try to simulate whiteboard coding
1. Check provided solutions
1. Repeat from 3

### Without the book:

1. Print the [skills diagram][cracking-the-coding-skills-diagram]{: target="_blank"}
1. Get a coding question (preferably one that also has a provided solution)
1. Follow the diagram for each coding question. It should become a habit
1. Check your solution against the provided solution
1. Repeat from 2

## Side effects

![Side effects illustration]({{ assets_path }}/side-effects.jpg)
{{caption_1}}

I began preparing long before I had the interview.
And in the meantime, I started noticing that I was applying the newly developed way of thinking: I analyzed more, thought how the code will look like and only then wrote it down.
It was a very pleasant side effect as I was writing more thought-through code faster.

## Take aways

If you really want that job at Facebook (or Google, Amazon...) then you want to increase your chances of getting it. 
These tips will help you prepare, but in the end it's down to you how much time and effort you'll invest into that. 

And even if you don't get that job now, you’ll end up acquiring a few new skills that you can use in your day-to-day job.
With most of these companies you can reapply in 6 months (ask your recruiter), and next time you'll have much less to prepare. 

[introduction-to-algorithms]: http://amzn.to/2h7i1hW
[the-algorithm-design-manual]: http://amzn.to/2y6ueaa
[cracking-the-coding-interview]: http://amzn.to/2y5W5qV
[system-design-course]: https://www.hiredintech.com/courses/system-design
[eloquent-js-book]: http://amzn.to/2jysgNb
[eloquent-js-online]: http://eloquentjavascript.net/
[cracking-the-coding-skills-diagram]: http://www.crackingthecodinginterview.com/uploads/6/5/2/8/6528028/cracking_the_coding_skills_-_v6.pdf
[js-garden]: http://bonsaiden.github.io/JavaScript-Garden/
