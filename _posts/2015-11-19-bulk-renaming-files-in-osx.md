---
title: Bulk renaming files in OSX
date: 2015-11-19T09:38:30+00:00
author: bumbu
layout: post
permalink: /bulk-renaming-files-in-osx/
categories: blog development
---
OSX comes with a pretty old bash version (3.2 for me). Bash has regex matching using `=~` operator. So you could write

```bash
f='mylongstring'
[[ $f =~ '(.*)' ]] && echo ${BASH_REMATCH[1]}
```

and it should return `mylongstring`. Unfortunately for me it didn't work. It was echoing an empty string. But regex seems to work as otherwise echo would not execute.

Upgrading bash to a newer version (4.3) didn't help. I ended up using `zmv` from ZSH. In order to use it just do

```bash
autoload zmv
zmv '(*)_old.jpg' '$1_new.jpg'
```
