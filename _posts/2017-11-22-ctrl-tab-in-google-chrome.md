---
title: "How to make Ctrl+Tab cycle between last used tabs in Google Chrome"
date: 2017-11-22 20:00:00 +0000
layout: post
permalink: /ctrl-tab-in-google-chrome-for-cycling-between-last-used-tabs
categories: blog
og_image: $/keyboard-maestro-editor.png
og_image_alt: "How to make Ctrl+Tab cycle between last used tabs"
og_description: "Two solutions on how to make it work: one convenient and one free"
comments: true
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

Google Chrome doesn't allow you to use Ctrl+Tab shortcut for navigation between last used tabs.

But this is a very common feature among many other tools that support multiple tabs (especialy among software development tools e.g. SublimeText, Atom, VSCode).

![Keyboard Maestro Editor for Google Chrome macro]({{ assets_path }}/keyboard-maestro-editor.png){: .aligncenter style="max-height: 400px;"}

## Solution 1: Manually edit Preferences

> NOTE: You may have to repeat the procedure (from step 4) every time you edit shortcuts or restart Chrome.

1. Install an extension:
  * [CLUT: Cycle Last Used Tabs](https://chrome.google.com/webstore/detail/clut-cycle-last-used-tabs/cobieddmkhhnbeldhncnfcgcaccmehgn)
  * [Toggle Switch Recent Last Tabs](https://chrome.google.com/webstore/detail/toggle-switch-recent-last/odhjcgnlbagjllfbilicalpigimhdcll) - will cycle between last 2 used tabs only
1. Go to the [chrome extensions](chrome://extensions){: target="_blank"} and scroll down to the Keyboard shortcuts
1. Enter a keyboard shortcut (e.g. `Alt+Q` for _Toggle Tabs_)
1. Quit Google Chrome
1. Open Chrome preferences file:
  * Mac: `~/Library/Application Support/Google/Chrome/Default/Preferences`
  * Windows: `C:\Users\YOUR_USERNAME\AppData\Local\Google\Chrome\User Data\Default\Preferences`
  * Ubuntu: `~/.config/chromium/Default/Preferences`
1. Search for the previously set keyboard shortcut inside the file, e.g. `Alt+Q` and replace it with `Ctrl+Tab`.
1. Save and close the file
1. Reopen Chrome, open few tabs, and then test the shortcut
1. Profit!

This solution is based on [this superuser answer](https://superuser.com/a/1258647/286069){: target="_blank"}.


## Solution 2: Intercepting and replacing shortcut commands (macOS only)

> This solution is based on [Keyboard Maestro](https://www.keyboardmaestro.com/main/){: target="_blank"} which has a 30-day trial, then you'll have to pay for it

1. Install an extension:
  * [CLUT: Cycle Last Used Tabs](https://chrome.google.com/webstore/detail/clut-cycle-last-used-tabs/cobieddmkhhnbeldhncnfcgcaccmehgn)
  * [Toggle Switch Recent Last Tabs](https://chrome.google.com/webstore/detail/toggle-switch-recent-last/odhjcgnlbagjllfbilicalpigimhdcll) - will cycle between last 2 used tabs only
1. Go to the [chrome extensions](chrome://extensions) and scroll down to the Keyboard shortcuts
1. Enter a keyboard shortcut (e.g. `Alt+Q` for _Toggle Tabs_)
1. Download and install Keyboard Maestro
  * Remove (or disable) all existing Macros
1. Create a new macro for Google Chrome:
    1. Install [this macro](https://goo.gl/7cgDgi){: target="_blank"} or do it manually:
    1. Create new Group
    1. Set it to be available only in Google Chrome application
    1. Create new Macro
    1. Set it to be triggered when `Ctrl+Tab` hot key is down
    1. Set it to simulate the `Alt+Q` keystroke (or whichever stroke you set up in Chrome extension)
1. Enable the macro
1. Profit!
