---
title: Converting a PDF book into EPUB
date: 2013-09-06T13:18:50+00:00
author: bumbu
layout: post
permalink: /converting-a-pdf-book-into-epub/
categories: blog experiments
---
I read book on iPad using iBooks. It handles PDF very well, but I do not fell comfortable without few features that are present when you read EPUB books:
<ul>
	<li>Highlights</li>
	<li>Infinite scroll</li>
	<li>Night mode</li>
</ul>
There are 2 straightforward ways to obtain an EPUB book:
<ul>
	<li>Find/borrow/buy it</li>
	<li>Convert from PDF to EPUB</li>
</ul>
I chose the most fun part - converting. Actually I chose this option after a lot of unsuccessful search.

I used one of the most popular convertors: Calibre. But it has a slight problem - converted books are not readable. Each book line is transformed into a paragraph. But as I found later it is a default behaviour which can be changed via options (enabling Heuristic Processing does a nice job).

This is a list of problems that I encountered and solved:
<ul>
	<li>I didn't know how EPUB format is structured</li>
	<li>On OS X it doesn't work classical extracting of EPUB contents</li>
	<li>Each line was transformed into a paragraph</li>
	<li>Calibri randomly generated 5 HTML files. Normally it should be one file for a chapter (which were 15 in my book)</li>
	<li>Words divided at the end of line with hyphen which ended up at the ends of paragraph</li>
	<li>Each PDF page had a title (of chapter and book) which were transformed in paragraphs/headings</li>
	<li>Each PDF page had a number which were transformed into text</li>
	<li>Each PDF page had some hidden trash information which were transformed into text paragraphs</li>
	<li>Typographic ligatures were transformed into letters divided by space</li>
	<li>Table of contents was not generated</li>
	<li>Vectorial images with text were transformed into paragraphs of text</li>
	<li>List (ordered and unordered) were treated as paragraphs</li>
	<li>Custom list styles were lost</li>
</ul>
<h2>I didn't know how EPUB format is structured</h2>
This time wikipedia gave really nice <a href="http://en.wikipedia.org/wiki/EPUB" target="_blank">description of EPUB format</a>. Also <a href="http://www.sitepoint.com/building-epub-with-php-and-markdown/" target="_blank">Building ePub with PHP and Markdown</a> article has a nice description of file contents.

In fact it is a HTML website in a zip archive with few additional structural files.
<h2>On OS X it doesn't work classical extracting of EPUB contents</h2>
This time I just took the <a href="http://www.mobileread.com/forums/showthread.php?s=5b77edaeb2fe84b67a730917d734e4ac&amp;t=55681&amp;page=6" target="_blank">ePub zip/unzip tool</a> and didn't wreck my mind with CLI.
<h2>Each line was transformed into a paragraph</h2>
I solved this problem using a RegEx which joined paragraphs if they were not ending with some specific symbols such as dot or exclamation mark. But it is much more easy to do by enabling Heuristic Processing in Calibri which will join paragraphs based on distance between lines.
<h2>Calibri randomly generated 5 HTML files.</h2>
I joined these files into one in order to easier manipulate with them. In the end I just split this file into 15 files (one file per chapter).
<h2>Words divided at the end of line with hyphen which ended up at the ends of paragraph</h2>
This problem was also solved with a RegEx but Heuristic Processing will do it for you.
<h2>Each PDF page had a title (of chapter and book) which were transformed in paragraphs/headings</h2>
I just removed all of them using a RegEx.

Later I added manually all 15 chapter titles at the beginning of chapters.
<h2>Each PDF page had a number and some hidden trash information which were transformed into text</h2>
<pre class="prettyprint">212
9781591888884_BookTitle_TX_p1-230.indd 212
9781591888884_BookTItle_TX_p1-230.indd 212
2/21/12 12:14 AM
2/21/12 12:14 AM</pre>
I just removed all of them using a RegEx.
<h2>Typographic ligatures were transformed into letters divided by space</h2>
I just searched for most common ligatures and removed spaces between letters.
<h2>Table of contents was not generated</h2>
Done it by hand.
<h2>Vectorial images with text were transformed into paragraphs of text</h2>
I did screenshots of these images in big format and embedded images into text.
<h2>List (ordered and unordered) were treated as paragraphs</h2>
Just found them all and replaced by hand.
<h2>Custom list styles were lost</h2>
The same as for lists - I found a pattern, added CSS classes through Find and Replace using a RegEx. Than just added necessary CSS to the main stylesheet.
