---
title: Rerunning Django tests automatically on files' changes
date: 2016-06-08T09:23:17+00:00
author: bumbu
layout: post
permalink: /rerunning-django-tests-automatically-on-files-changes/
categories: development
---
One of the good things of being exposed to different technologies is that you can get good things/methodologies from one field and apply them to other fields.

One such thing is automating tests running. Normally if you work on a Django (Python?) project you:
1. manually write code
1. manually write tests
1. manually run tests (go to 1 or 2 if tests fail, allways happens to me)

Automating first 2 is a bit problematic (for now) but 3rd one seems like a perfect canditate for that.

<img src="http://bumbu.me/wp-content/uploads/2016/06/automation-1.jpg" alt="automation" width="1280" height="791" class="aligncenter size-full wp-image-995" />

### Simple way of automating tests running

If you want to get started fast then one option is to:
* Install [Nodemon](http://nodemon.io/)
* Instead of running manually `./manage.py test` run `nodemon --ext '.py' --exec "./manage.py test"` once

Then everytime you'll change a `.py` file in you project, tests will rerun automatically. If you want more control over files watching then Nodemon has options for watching only specific file extensions, files, folders or ignoring things.

### Advanced way of automating tests running

Say you have a really big project and running all tests takes lots of time, or you want to run only tests affected by file changes, then you can create a recipe like following:
1. Name and place your tests file in such a way that it is possible to programatically detect which test file covers a given code file _(e.g. views/home.py is tested by tests/views__home.py)_
1. Create a file watcher (say using Gulp)
1. When a test file changes - run only that test file
1. When a code file changes:
    * If it is possible to detect which test file matches given changed file (see 1) then run only that test file
    * Otherwise run all tests (or none)

Happy automating!
