---
title: "Automatically prepend issue tag to commit message"
date: 2017-04-10 18:00:00 +0000
layout: post
permalink: /automatically-prepend-issue-tag-to-commit-message
categories: development
---

> Consistency is a very important factor in software development. 

But because different developers have different experiences and preferences it takes some time and effort to achieve consistency in projects. 

A solution to that are discussed and then tool-enforced rules. 
Some solutions to that are linters, code formatters, checks on the CI and code reviews. 

## When to run code health checks?

These are all good practices, but one of the questions that arises is - how and when to have this things running?

With checks on the CI and with code reviews most common scenario is to do these things then a feature/fix is complete and it's pushed for testing/review. 

Automatic code formatters also could live on the CI, but then if they do change any of the code, that has to be pushed back into the repo, and that's not that good anymore (as the CI shouldn't contribute to the code).

So linting and code formatting should be done on the developer's machine. That could be run on each file save - but that may become annoying or even confusing if the code formatting is gonna change the code you're workin on. 

Another option is to run them manually, but in my experience - anything that's not imposed, is most often ignored. 

## Enter VCS hooks

A better place to run these things are right before you create a commit (if you use an VCS) as at that point you did a small self-contained change that should be able to pass tests. So we can run our checks right before the commit is created. Most VCSes (GIT, SVN, Mercurial, ...) support hooks such as `pre-commit` and `commit-msg` hooks. 

`pre-commit` hook allows you to run a custom script, and if it exits with a non-zero code than the commit is aborted. This can be used to run tests, linting, automatic code formatting and anything else used to ensure commit/code healthiness.

`commit-msg` hook allows you to read and modify the commit message and body. 

## GIT hooks for JavaScript (and not only) projects

The problem with GIT hooks is that you can't just store them in the repo itself and have them magically work. They would need to be symlinked for each new machine. 

If your project uses NPM then a very nice solution for that is [typicode/husky](https://github.com/typicode/husky). This package allows you to define all git-hooks in your `package.json`, so if a new hook has to be added, removed or changed - all the developers working on the project will get that on the next code fetch.

## Using hooks to automatically add tags to commit messages

Many project management tools (e.g. JIRA) have an issues system where each issue is part of the project. 
So each issue gets an ID of the form `TAG-123` where `TAG` is the project prefix, and `123` is issue number. This makes each issue unique across entire organization. 

Having a reference to the issue in each commit proved many times to be very useful as it provides context to the code without polluting commit messages and a way to filter commits after they get merged into the production/master branch. 

In theory it sounds good, in practice different developers have different opinion about importance of doing that, and often simply forget to tag most of the commit. In fact I also sometimes find myself writing meaningless and untagged commit messages. 

This can be easily improved by using a `commit-msg` GIT hook - whenever a commit is created, the hook will check the commit message for the tag, and if one doesn't exist - it will add it. This script still needs some context on how to get current issue ID. It can be done in few ways, but the easiest one is a naming convention for branches - every branch name starts with the issue ID. This also makes searching checking-out much faster. 

### First-time work-flow

These are the steps you have to take to add this to your project:

* Install *husky* `npm install --save-dev husky`
* Create a `scripts` folder and add the `commit-msg.js` file provided at the end of this article
* Change `JIRA_TAG` variable value to your project tag
* Add a *commit-msg* to *scripts* in `package.json`

```json
{
  "name": "bumbu.me",
  "scripts": {
    "commit-msg": "node ./scripts/commit-msg.js",
  }
}
```

### Day-by-day work-flow

Now the only change that every developer will have to make is:

* Run `npm install` _(the usual)_
* When creating a new branch - prepend it with the issue number (e.g. `TAG-234-change-button-style`)

Now developers shouldn't have any excuses for why their commits are not tagged (if you agreed as a team to do that)!

### commit-msg.js file

<script src="https://gist.github.com/bumbu/751251ad900f7a28e56b6388071d0183.js"></script>

## Other use-cases

This same method can be used for many other useful things like:

* Spell-check commit messages
* Check for min/max message length
* Check for often used meaningless names like *Tidy up* or *Fixes*
* [Prepend random emojis to each commit message](https://github.com/9-volt/radio-erevan/commits/master?after=3697532107ac62996d8479695111e7ee60beb728+69){: target="_blank"}
