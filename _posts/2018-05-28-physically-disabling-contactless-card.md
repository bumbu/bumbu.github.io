---
title: "Disabling contactless card functionality"
date: 2018-05-28 10:00:00 +0000
layout: post
permalink: /physically-disabling-contactless-card
categories: blog
og_image: $/card-schema-monzo.jpg
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}


![Universal Contractless Card Symbol]({{ assets_path }}/Universal_Contactless_Card_Symbol.svg){: .alignright style="max-height: 100px;"} Contactless payments is a very convenient technology. You don’t have to take the card out of your wallet (most of the times). You touch in the wallet, wait for a confirmation and you can go.

But that’s only if you have a single contactless card in your wallet. Get 2, and it becomes a roulette game. It gets worse in tube (metro) as if you touch in with one card and touch out with another - you’ll get charged twice. That's because the system can’t detect that you did one connected journey.

## Alternative solutions first

There are few solutions to this:

* **most inconvenient** - Always take the card out of your wallet
* **somehow inconvenient** - Use your phone (e.g. Apple Pay or Google Pay)
* **ok** - Have only one contactless card in your wallet
* **best** - [Amazon GO](https://www.amazon.co.uk/?&_encoding=UTF8&tag=bumbu-21&linkCode=ur2&linkId=e5f19120cd01026237958acc53fa5488&camp=1634&creative=6738){: target="_blank"} (which is out of question for this article)

You can argue that using your phone is as convenient as having one contactless card in your wallet, and is actually more secure but it has few drawbacks:

* It’s slower when touch ID or face recognition fails (happens often to me)
* You still need to have a normal card with you in case contactless is not accepted
* Highly dependent on phone being charged :)

But having only one contactless card has one drawback - you still need a back-up. It can be a secondary card or some cash. Unfortunately nowadays most cards are contactless so you may have some hard time finding a non-contactless card.

We’re going to fix that by disabling contactless functionality.

> Warning: This is irreversible - once done, if you want contactless functionality back - you’ll have to order a new card.

## Short lesson on how contactless works

![Card X-ray]({{ assets_path }}/card-x-ray-steps-2.jpg){: .aligncenter style="max-height: 160px;"}

Contactless is based on induction. For that your card has several wires that serve as an antenna for communication and power. Those wires are in a loop, and if the loop is broken - then the antenna doesn’t work. So cutting one wire that would break the loop - will disable the contactless functionality and will not interfere with other cards.

## How to identify which wire to cut

From the looks of most cards wiring and my experience - it’s enough to cut any one wire to disable contactless completely. There’re few caveats though which we’ll cover next.

The easiest way to see all the wiring is to use a X-ray machine. It will give you a picture like this:

![Card X-ray]({{ assets_path }}/card-x-ray.png){: .aligncenter style="max-height: 240px;"}
I don’t so I went with the next easiest thing - use the light. By using the flash light from you phone - you can detect the wiring for many cards. Some cards are less transparent then others, so you’ll need a dark room and you’ll have to light few “hot spots” where the wires are the easiest to see.

{% assign galleryArray = "1|2" | split: "|" %}
{% for index in galleryArray %}[![Card light through]({{assets_path}}/card-light-{{ index }}.jpg){: width="50%"}]({{assets_path}}/card-light-{{ index }}.jpg){: .lightbox }{% endfor %}

When you spot the wire - I recommend marking them with a marker so that you know where to cut.

If the card is very opaque and it’s hard to see any wire, or you don’t want to spend time on this - jump to [Cuts that will work 99% of times](#cuts-that-will-work-99-of-times).

## Cuts that will work 99% of times

There are 2 cuts that should cover most cards:

* **Top left cut** - Do a cut 4mm wide, 1mm from the edge. Choose any point between the chip and top edge.
* **Right cut** - Do a cut 5mm wide, 2mm from the edge. Make it approximately at the same height with the chip.

![Card cut]({{ assets_path }}/card-cut.jpg){: .aligncenter}

## How to cut
After identifying which wires to cut, you can use a sharp knife to do the cuts. A kitchen knife should do it.

It’s enough to do a small cut-through to break the wire connection. If you’re unsure - do a wider or deeper cut.

An alternative is to use a paper punch which will definitely cut the wires ;)
![Punched card]({{ assets_path }}/card-punched.jpg){: .aligncenter}

Or make a deep cut using scissors like in this picture.
![Wide cut card]({{ assets_path }}/card-full-cut.jpg){: .aligncenter}

## Bonus: Example wirings

Here are few wiring for some popular UK cards:

[Monzo](https://monzo.com/){: target="_blank"} and [Revolut](https://revolut.com/r/alexancht){: target="_blank"} have the same _complicated_ wiring:

![Monzo and Revolut contactless wiring]({{ assets_path }}/card-schema-monzo.jpg){: .aligncenter}

HSBC and AMEX cards:
![HSBC contactless wiring]({{ assets_path }}/card-schema-hsbc.jpg){: .aligncenter}

Others:
{% assign galleryArray = "1|2|3|4" | split: "|" %}
{% for index in galleryArray %}[![Card contactless wiring]({{assets_path}}/card-schema-card-{{ index }}.jpg){: width="50%"}]({{assets_path}}/card-schema-card-{{ index }}.jpg){: .lightbox }{% endfor %}

