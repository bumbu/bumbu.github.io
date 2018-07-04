---
title: "Building a garden table from recycled wood for 39£"
date: 2018-07-03 10:00:00 +0000
layout: post
permalink: /building-a-garden-table-from-recycled-wood
categories: blog
og_image: $/20.jpg
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

> This is a story in pictures of building a garden table from scrap wood.

All in all in numbers:

* A week of work after work hours + the weekend
* All the wood was found left on the street as garbage
* Spent 39£/$52 on:
  * 22£ on [Mouse Detail Sander](https://amzn.to/2MG6Ze4){: target="_blank"} for sanding the old paint and finishing the table top
  * 3£ on [a box of screws](https://amzn.to/2KPbdjm){: target="_blank"}
  * 8£ on [wood stain](https://amzn.to/2IPeopk){: target="_blank"} - more than half still left
  * 6£ on [wood handsaw](https://amzn.to/2MP0KF0){: target="_blank"} - one time buy, was useful multiple times


{% capture picsText %}
Future top of the table was part of the bed frame
Table legs were slowly stripped of old paint
Preparing panels for paint
Preparing panels for paint
Preparing panels for paint
Panels coated with one layer of wood stain
Getting ready for assembly
Getting ready for assembly
Charging the drill
Frame assembled, testing panels
Flipping panels with the uncoated side upwards
Screwing side panels
Spacing panels equally
Putting some weight on so that panels don't move
Drilling holes in panels
Screwing panels on one side
Screws have to be screwed manually at the end as so the panels don't crack
All panels now screwed
First coating of the table's top
Table as the center piece
Table as a cozy place
{% endcapture %}

{% assign galleryArray = picsText | newline_to_br | split: "<br />" %}
{% for picture in galleryArray offset:1 %}{% assign localPicture = picture | strip_newlines %}{% if localPicture != "" %}[![{{localPicture}}]({{assets_path}}/{{forloop.index}}.jpg){: width="33%"}]({{assets_path}}/{{forloop.index}}.jpg){: .lightbox }{% endif %}{% endfor %}
