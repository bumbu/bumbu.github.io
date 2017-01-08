---
title: Asana for Rails development
date: 2012-09-02T15:32:34+00:00
author: bumbu
layout: post
permalink: /asana-for-rails-development/
categories: blog
---
<a href="{{site.root}}/assets/images/2012/09/asana-logo.png"><img class="alignright  wp-image-208" title="asana-logo" alt="" src="{{site.root}}/assets/images/2012/09/asana-logo.png" width="244" height="83" /></a>At work we use Asana as a Task Management System. It's not only about Rails, but about any MVC based system, or any other system in which responsibilities are well divided.

We work on a project in team of 5 people:
<ul>
	<li>Customer relations/Project evangelist/Task manager</li>
	<li>Designer/UI/UX</li>
	<li>Front-end developer/UI/UX (me)</li>
	<li>Back-end developer/Models/Database</li>
	<li>Back-end developer/Controllers/Helpers/Testing</li>
</ul>
The first guy keeps all progress in mind and takes care everything to be planned, well described and not forgotten. Also he should make customer fell happy.

Second and third ones are responsible for how web app will look like and how it will interact with user.

Last two guys are working on invisible part of web app, providing high speed and reliability for app.
<h3>How is everything set:</h3>
We have one workspace for our department with all projects on which we work or which we support.

<a href="{{site.root}}/assets/images/2012/09/asana-usage-11.png"><img class="alignnone size-full wp-image-199" title="asana-usage-1" alt="" src="{{site.root}}/assets/images/2012/09/asana-usage-11.png" width="500" height="268" /></a>

Tags are used to mark tasks with special status ordered by their priority as following:
<ul>
	<li>bug</li>
	<li>urgent</li>
	<li><em>(tasks with no tag)</em></li>
	<li>incomplete description</li>
	<li>non urgent</li>
	<li>for future</li>
	<li>docs</li>
</ul>
Tasks with <em>incomplete description</em> tag are those are not fully described, awaiting customer feedback or on which Task Manager now is working. Any member of team can assign this tag to a task which he think has not enough details, or has some missing information.

Tasks with <em>for future</em> tag are things that have low priority and were not discussed at all. This kind of tags can be added to be reviewed by Task Manager or discussed at daily/weekly meetings.

<em>Docs</em> are tasks/notes used to store some useful information about different aspects of the project.

All tasks are divided into pages by priority headings. For example if our app has a page with companies list, and a company details page, then tasks list may look like this:

<a href="{{site.root}}/assets/images/2012/09/asana-usage-2.png"><img class="alignnone size-full wp-image-200" title="asana-usage-2" alt="" src="{{site.root}}/assets/images/2012/09/asana-usage-2.png" width="575" height="427" /></a>

There also can be some other priority headings (ex. <em>General</em> for tasks related to whole project). Priority heading has in their description all main details about that page with screenshots attached and any other useful documents.

Every task has 5 main things which we are using widely:
<ul>
	<li>Description</li>
	<li>Assignee</li>
	<li>Followers</li>
	<li>Tags</li>
	<li>Comments</li>
</ul>
<a href="{{site.root}}/assets/images/2012/09/asana-usage-3.png"><img class="alignnone size-full wp-image-201" title="asana-usage-3" alt="" src="{{site.root}}/assets/images/2012/09/asana-usage-3.png" width="445" height="315" /></a>

All tasks have sub tasks set in description as a list of item with preceding empty square brackets. Each sub task has the name of the person which should implement it. Sub sub tasks are done by preceding an item from the list with two spaces. Additionally tasks may contain links to other tasks or docs.

Task details usually are provided by Tasks Manager. After doing that, task is assigned to the person that is in charge of the first sub task. Now that person will have this task in <em>My Tasks</em>.

Normally people that are following are the ones that have sub tasks, but in fact anybody can subscribe. To be mentioned, Task Manager is always a follower.

We do not prioritize tasks by their position in list.
<h3>The workflow:</h3>
With this structure, workflow becomes really simple:
<ul>
	<li>When a task is assigned to you can start to working on it</li>
	<li>When you finished a sub task, you have to push changes (we use git), mark a sub task as done (inserting into square brackets a <em>x</em> sign) and assign the task to next person in the sub tasks list</li>
</ul>
<div>It's almost all you do 95% of time (in case you are not a Tasks Manager). Of course there are few ifs:</div>
<div>
<ul>
	<li>If you had last sub task and you finished it - you have to mark the task as <em>Complete</em></li>
	<li>If after doing a sub task you have some important information to share - you should do it in task comments (for example indicating JSON link for some charts)</li>
	<li>While doing your sub task you saw that one of the previous persons implemented the sub task wrong/poorly, you can comment it, unmark this sub task (empty its square brackets) and reassign back this task to that person.</li>
	<li>If you can't complete a task (T1) because of a missing feature from some other task (T2) you can:
<ul>
	<li>Add to T2 a sub task that will say to reassign T1 when sub task will be finished</li>
	<li>Unassign T1</li>
</ul>
</li>
	<li>If you finished your sub task and assigned the task to some other person, and then realised that you are not done:
<ul>
	<li>then you can reassign it back to you if that task wasn’t marked when it should be done (today, upcoming, later)</li>
	<li>otherwise ask that person to assign this task back to you (using comments, or any other communication channels)</li>
</ul>
</li>
</ul>
<div>
<h3>Built in Asana sub tasks:</h3>
As of end of August Asana introduced sub tasks. These are tasks inside tasks, but them are not assigned to the project of the parent task. As first it may seem that it's perfect solution for described in here sub tasks notation, but these sub tasks may work well only in case of one level of sub tasks (no sub tasks of sub tasks). If you'll have more than one level of sub tasks, than you'll get lost into them as there is no easy and fast way to visualize them.

</div>
</div>
<h3>Statistics and motivation:</h3>
By the end of the day we collect 2 types of statistics:
<ul>
	<li>how many tasks where closed</li>
	<li>how many tasks each person is assigned to</li>
</ul>
Motivation comes from:
<ul>
	<li>Trying to have as few as possible tasks</li>
	<li>Assign tasks to other people as fast as possible</li>
</ul>
<h3>Results:</h3>
After 4 weeks of using this approach we gained:
<ul>
	<li>More than 200% boost in productivity</li>
	<li>Time spent on reddit, reader and other unrelated to work websites decreased from 2h to 30 min per person (RescueTime)</li>
	<li>Nobody argues about not having tasks</li>
	<li>Less bugs and forgotten features</li>
	<li>Easier estimation of needed time</li>
</ul>
