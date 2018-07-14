---
title: "Building a free garden cover/pergola from recycled materials"
date: 2018-07-14 10:00:00 +0000
layout: post
permalink: /building-a-free-garden-cover-pergola-from-recycled-materials
categories: blog
og_image: $/pergola-8.jpg
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

> This is a story in pictures of building a garden cover/pergola from scrap wood and fabric.

All in all in numbers:

* Half day of work
* No money spent. List of used materials:
  * Wood - All the wood was found left on the street as garbage
  * Fabric - Used [IKEA curtains](https://amzn.to/2zGlI7k){: target="_blank"} that we had laying around and never used (you can buy them for 10£). We sew them together to get one large piece of fabric
  * [Screws](https://amzn.to/2KPbdjm){: target="_blank"} - had some left from [building the garden table](/building-a-garden-table-from-recycled-wood){: target="_blank"}
  * [Wood handsaw](https://amzn.to/2MP0KF0){: target="_blank"} - also bought it when building the garden table


{% capture picsText %}
Installing wall poles
Fitting main bar through the curtains' hidden tabs
Looks like a sail
Positioning the wood
Screwing the wood so that it can rotate
Pergola in assembled and closed state
Pergola in assembled and open state creating a shade
Garden view with pergola creating shadow
{% endcapture %}

{% assign galleryArray = picsText | newline_to_br | split: "<br />" %}
{% for picture in galleryArray offset:1 %}{% assign localPicture = picture | strip_newlines %}{% if localPicture != "" %}[![{{localPicture}}]({{assets_path}}/pergola-{{forloop.index}}.jpg){: width="33%"}]({{assets_path}}/pergola-{{forloop.index}}.jpg){: .lightbox }{% endif %}{% endfor %}
