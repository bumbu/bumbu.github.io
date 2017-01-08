---
title: Front page links in admin of Prestashop 1.5.x
date: 2013-08-13T21:03:24+00:00
author: bumbu
layout: post
permalink: /front-page-links-in-admin-of-prestashop-1-5-x/
categories: development
---
The right way to display link in Prestashop is by using methods of Link class. It is often used <a href="https://github.com/PrestaShop/PrestaShop/blob/1e10dab8f8bf57ce663bb837ca9532f584833acf/classes/Link.php#L455" target="_blank">getPageLink</a> method.

When you need to use this function from admin panel for front controllers - it will not use canonical form. All because Dispatcher object can be initiated in 3 states: front, admin and module. And front controllers' routes are available only when dispatcher is called from front controller.

To overcome this problem you may add a custom <a href="https://gist.github.com/bumbu/6225669" target="_blank">getPageLinkCustom</a> method which will accept as last parameter a controller type.

<script src="https://gist.github.com/bumbu/6225669.js"></script>
