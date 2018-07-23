---
title: "Automating Todoist tasks to change a task when another one is completed"
date: 2018-07-23 10:00:00 +0000
layout: post
permalink: /automating-todoist-tasks
categories: experiments
og_image: $/todoist.png
---

<style type="text/css">
  .gist-file .gist-data {max-height: 200px;}
</style>

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

[Todoist](https://en.todoist.com/){: target="_blank"} is a tool for tasks management/GTD.
One of its nice properties is being powerful by being simple.

![Todoist]({{ assets_path }}/todoist.png)

But it's limited when it comes to automating more advanced flows.
Luckily Todoist has an API that we can use to build any missing feature.

There're 2 flows that I wanted for a long time:

* Changing the priority of the 2nd task in a project when first task gets completed
* Changing the priority of a specific task when another task gets completed (aka dependency)

## Microsoft flow

[Microsoft Flow](https://emea.flow.microsoft.com/){: target="_blank"} is an IFTTT service that provides a lot of connections, including integration with Todoist.

![Microsoft Flow]({{ assets_path }}/miscrosoft-flow.png)

## Changing the priority of the 2nd task in a project

After playing with it for a while, I managed to create a flow that would:

* When a task is completed
* Read that task project ID
* List all open tasks from that project
* Get first task from the project
* Set that task priority to `p3`

That one works fine. The only caveat is that you have to select the project for the task to be listened upon.
So if you want to make this work for few projects - you'll have to duplicate the rule for each one of them.

_You can import this flow, change the project and just use it:_
<script src="https://gist.github.com/bumbu/1cda244cdc386e9248d95ffa2ca3a890.js"></script>

## Changing the priority of a specific task when another is completed

For the second scenario of changing the priority of a given task when another task is completed - we need to know how tasks a connected.
One way of doing this is by encoding the ID of one task in the title of another.

![Todoist task with ID in title]({{ assets_path }}/todoist-task-with-id.png)

The the code is quite trivial:

* When a task is completed
* Check task's name if it contains the encoding (in our case `->` characters)
* If yes then parse everything after the `->` sign
* Use extracted ID to load dependent task
* Change that task's priority

_You can import this flow, change the project and just use it:_
<script src="https://gist.github.com/bumbu/640448f98bd00d4d33a8a45afc5f6737.js"></script>

But again the issue in this case is that you have to choose a single Todoist project for the flow, and this doesn't scale.

## Zapier

A scalable solution can be easily achieved using Zapier.
It allows using a websocket as a trigger.

![Zapier JS Step]({{ assets_path }}/zapier.png)

Setting it up requires doing following steps:

* Go into [Todoist Developer](https://developer.todoist.com/appconsole.html){: target="_blank"} and create an app
* Create yourself a test token. Copy it
* Create a webhook URL that listens for completed tasks only
* Go into Zapier and create a new Zap
* Use the webhook URL from previous steps as a trigger for the Zap
* For the action use the code provided below and replace `YOUR_TEST_TOKEN` with the token you got in previous step

```js
const needle = '->';
if (inputData.text.indexOf(needle) !== -1) {
  const ID = inputData.text.substr(inputData.text.indexOf(needle) + 2).trim();
  doPost(`https://beta.todoist.com/API/v8/tasks/${ID}`, {priority: 2})
    .then(function(res) {
      return res.text();
    })
    .then(function(body) {
      callback(null, {success: true, body: body, id: ID});
    })
    .catch(callback);

} else {
  callback(null, {success: false});
}

function doPost(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_TEST_TOKEN",
    },
    referrer: "no-referrer",
    body: JSON.stringify(data),
  })
}
```

It works like a charm, is not limited to only one project, and is very easy to customize if you know a bit of coding. And the best part is that it's maintenance-free.

The only downside is that after first 2 weeks you have only 100 events per month.
That is equivalent to completing 100 tasks per month which may be limiting for many.

It's still a nice experiment to understand how much I actually "need" such a feature.
