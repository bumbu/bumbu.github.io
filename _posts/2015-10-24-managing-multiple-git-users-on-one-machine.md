---
title: Managing multiple GIT users on one machine
date: 2015-10-24T12:21:48+00:00
author: bumbu
layout: post
permalink: /managing-multiple-git-users-on-one-machine/
categories: blog development
---
Let's say you have few GIT users (name + email) you're using:

* **alex@bumbu.me** - for personal projects
* **bumbu@yourworkwebseti.com** - for work

If at work you're working just on one big project, and all other GIT projects are your personal projects then you can set your personal GIT user to be global GIT user. And for that one project set GIT user to be your work user.

But if you have multiple GIT projects - both personal and for work then with previous approach at some point you'll forget to update one work project. And you're commits will be from a wrong user.

A simple and annoying solution is not to set global GIT user. And every time you change shell directory to your project, if you didn't set a GIT user - it will tell you about that.

![git-prompt-no-user](http://bumbu.me/wp-content/uploads/2015/10/git-prompt-no-user.png)

And after you set the user, your shell will look as normal:

![git-prompt-with-user](http://bumbu.me/wp-content/uploads/2015/10/git-prompt-with-user.png)

If you have Oh-My-ZSH then it is simply to do by rewriting `git_prompt_info` function to this:

```bash
# get the name of the branch we are on
function git_prompt_info() {
  if [[ "$(command git config --get oh-my-zsh.hide-status 2>/dev/null)" != "1" ]]; then
    ref=$(command git symbolic-ref HEAD 2> /dev/null) || \
    ref=$(command git rev-parse --short HEAD 2> /dev/null) || return 0
    user=$(command git config user.email 2> /dev/null) || ""
    if [ -n "$user" ]
    then
    else
      echo "$fg_bold[red]Warning! No user set up for this repo!"
      echo "Please add one by typing: $fg_no_bold[white]git config user.email your@email.com"
      echo "$fg_bold[red]Also it will be nice to add your name by typing: $fg_no_bold[white]git config user.name \"Your Name\""
    fi
    echo "$ZSH_THEME_GIT_PROMPT_PREFIX${ref#refs/heads/}$(parse_git_dirty)$ZSH_THEME_GIT_PROMPT_SUFFIX"
  fi
}
```

Normally you have to add this function to `~/.oh-my-zsh/custom/my_patches.zsh` but it messes with autocomplete, so I just overridden this function in `~/.oh-my-zsh/lib/git.zsh`.
