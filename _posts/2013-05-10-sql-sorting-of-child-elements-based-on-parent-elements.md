---
title: SQL Sorting of child elements based on parent elements
date: 2013-05-10T13:37:25+00:00
author: bumbu
layout: post
permalink: /sql-sorting-of-child-elements-based-on-parent-elements/
categories: development
---
When you have questions and answers (for example) on your site, you want to sort and show answers under questions. My solution is based on few assumptions:
<ul>
	<li><span style="line-height: 13px;">Questions and Answers are stored in the same SQL table</span></li>
	<li>Questions and Answers IDs are chronological</li>
	<li>Difference between a question and an answer is based on id_parent column</li>
	<li>Question's id_parent is zero</li>
	<li>Answer's id_parent is non-zero</li>
</ul>
Now normally if you sort by ID then you may end up with something like:
<ul>
	<li><span style="line-height: 13px;">Question 1</span></li>
	<li>Question 2</li>
	<li>Answer to question 1</li>
	<li>Question 3</li>
	<li>Answer to question 2</li>
	<li>Answer to question 1</li>
	<li>Answer to question 3</li>
</ul>
But in fact we want:
<ul>
	<li>Question 1</li>
	<li>Answer to question 1</li>
	<li>Answer to question 1</li>
	<li>Question 2</li>
	<li>Answer to question 2</li>
	<li>Question 3</li>
	<li>Answer to question 3</li>
</ul>
The solution is very simple - use new select column which will:
<ul>
	<li><span style="line-height: 13px;">Keep id_parent if it is non-zero</span></li>
	<li>Set id_parent as ID if it is zero</li>
</ul>
SQL query that will return questions and answers to them in right order is:
<pre class="language-sql"><code>SELECT *, IF(`id_parent`&gt;0,`id_parent`,`id_comment`) AS `id_super`
FROM `comments`
ORDER BY `id_super` ASC, `ID` ASC</code></pre>
