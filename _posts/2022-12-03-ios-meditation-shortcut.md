---
title: "iOS meditation shortcut"
date: 2022-12-03 18:00:00 +0000
layout: post
permalink: /ios-meditation-shortcut
categories: development
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

I often meditate for a preset amount of time.
This helps with not thinking about how long I've been meditating (aka Timer Anxiety).
I also often only have a limited amount of time for that.

## Requirements

Whenever I meditate, I need to:
* Minimize distractions (so set phone to "Do Not Disturb" mode)
* Have a **reliable** timer which works even in silent mode
* Log the meditation to "Health" app

## Possible solutions

Generally I found 3 possible solutions to this:
* Do everything manually - which would work, but gets frustrating pretty fast
* Use a dedicated meditation app - didn't even look into those as those can randomly die, so the timer may never sound
* Create an iOS shortcut

## iOS meditation shortcut

Given the above, I decided to go with a shortcut, and found [this shortcut](https://www.reddit.com/r/shortcuts/comments/sie1oa/simple_meditation_timer_with_ios_shortcuts/){: target="_blank"} which does the above things (and some more).

I used it for about 1 month, but I had 2 issues with it.

First - shortcut would sometimes log 14 minutes of meditation instead of 15 (aka 1 less). I found the bug and updated the shortcut (see shortcut link bellow).

Second - I wanted to have a bell sound both at the beginning and before the timer would ring. That's because I always have my phone on silent, including my alarm app having only vibration and no sound. But I found it very jaring to end the meditation with a vibrating phone. So I wanted the same bell sound to play 20-30 seconds before the timer would end to be able to exist the meditation "softly".

And I stil wanted to keep the alarm as a back-up if sound wouldn't play.

## How to play a very long chain of sounds through iOS shorcuts

iOS shortcuts allow you to play a sound, and to have a "wait" clause. The problem with these is that they're blocking. Aka is you ask it to play a sound, it will not perform any other actions until the play has ended. The same goes about the "wait".
Which would work fine, but on top of that, iOS shortcuts have a timeout (5-10 minutes). So if your meditation session is longer than the shortcut timeout, the final sound would not play.

A "simple" and reliable solution that I found is to play the sounds in Music app, and for the "gap" in between sounds, use mp3 files with no sound.

So the sequence would be:
1. bell sound
2. 1 minute of silence
3. 1 minute of silence
4. ... and so on
5. bell sound

![Music Meditation Playlist]({{ assets_path }}/music-meditation-playlist.jpeg)

For the bell sound I used [this track](https://notification-sounds.com/1498-meditation-bell-sound.html){: target="_blank"} which is 17 seconds long.

For the "blank" sound I used [this track](https://github.com/anars/blank-audio/blob/master/1-minute-of-silence.mp3){: target="_blank"} which is 1 minute long. I chose 1 minute because it allows me to create dynamic playlists of any duration.

## How to use the shortcut

1. First you need to download the [bell sound](https://notification-sounds.com/1498-meditation-bell-sound.html){: target="_blank"} and [blank sound](https://github.com/anars/blank-audio/blob/master/1-minute-of-silence.mp3){: target="_blank"}.
1. You need to import these to your Music app
1. Rename them to "meditation-bell-sound" and "1-minute-of-silence". Alternativelly you can change these in the shortcut itself
1. Get the shortcut [here](https://www.icloud.com/shortcuts/33f386b032e248548ebd8136c025d4fa){: target="_blank"}

You can use any sound instead of the bell if you wish.
You can also have a different sound for the beggining and the end of the session. For that you'll have to change track name in the shortcut.
