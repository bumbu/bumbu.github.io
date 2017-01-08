---
title: Suppress Prestashop 1.5.x update message in admin panel
date: 2013-04-04T14:58:10+00:00
author: bumbu
layout: post
permalink: /suppress-prestashop-1-5-x-update-message-in-admin-panel/
categories: development
---
In order to suppress update message in admin panel of prestashop 1.5.x you have to edit file \override\classes\Upgrader.php like this
<pre class="language-php"><code>class Upgrader extends UpgraderCore
{
  public function checkPSVersion($force = false){
    return false;
  }
}</code></pre>
Now there will be no more upgrade prompts in admin panel.

p.s. It is a bad habbit to keep your software outdated
