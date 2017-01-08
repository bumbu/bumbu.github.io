---
title: Offline sharing of GIT commits
date: 2016-02-04T08:58:43+00:00
author: bumbu
layout: post
permalink: /offline-sharing-of-git-commits/
categories: development
---
Let's say you lost access to a repository but you're still working in a team on the code.
How do you share GIT commits/branches?

One way to do that it to use `git create-patch` but the problem with that is that most probably when you'll apply the patch - hashes will be different. This may be fine, but if when your repo will come back - everyone will be out of sync (in terms of GIT and not in terms of data/code).

Another solution is to use `git bundle`. `git bundle create bumbu.bundle master` creates a file `bumbu.bundle` which can be used as a remote repository. Meaning if you place your file in `~/bumbu.bundle` then in your git directory you can do `git pull ~/bumbu.bundle master` that will pull all changes from that file as from a remote source.

Before pulling or merging data, first it is good to check if the bundle is a valid bundle for your history tree `git bundle verify ~/bumbu.bundle`.

Safest and easiest way is to create a branch bundle that contains all the commits - this way anyone will be able to use, even those people who have no git history at all. Actually you can do `git clone ~/bumbu.bundle -b master folder_name` which will do the usual clone.

But the problem with creating a bundle will all branch commits is that it can be quite big. It was at ~20Mb for a Django project with ~150 commits. A solution for that is to create a bundle with only a range of commits `git bundle create bumbu.bundle master master~10` (this will bundle only last 10 commits, or 9, have to check as `master~10` will not be bundled).

So now you can happily team-code when your GIT server is down.
