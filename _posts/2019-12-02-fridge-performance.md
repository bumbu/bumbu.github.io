---
title: "Is fridge more performant when full?"
date: 2019-12-02 00:00:00 +0000
layout: post
permalink: /is-fridge-more-performant-when-full
categories: blog
---

{% capture assets_path %}{{site.assets_path}}{{page.date | date: "%Y/%m"}}{% endcapture %}

tl;dr; Filling your fridge is not likely to noticeably affect its working time.

My fridge works a lot. At least that's how I thought about it. If I would have a sleepless night, it would feel like the fridge is turning on every 20-30 minutes.

After a short googling, one of the often recommended solutions is to "fill the fridge". Aka if it's empty, it would work more often as it would warm up faster. I did that, but it didn't feel like it was working less often. This post tries to answer this question using experimental data.

## Hypothesis

The Hypothesis is that the fridge will work less minutes during a fixed amount of time given similar conditions.
The only difference would be how much stuff it contains. Less things would mean less energy capacity, meaning that fridge will warm up faster, meaning that it will have to work more often, meaning it will work for longer.

## Set-up

The fridge is a Whirlpool, model WRB119WFBM. Here are the main properties:

* Freezer has a separate door, located at the bottom
* Freezer volume - 5.73 cu. ft. (aka 162 liters)
* Refrigerator volume - 12.94 cu. ft. (aka 366 liters)
* Freezer set at power 2 (out of 7)
* Refrigerator set at power 4 (out of 7) with approximate temperature of 3°C (38F)
* Working time is measured using an audio recorder
* Working time is measured during the night (for 8h45m) between 11pm and 7am.
* 1 hour before test the fridge is not opened to let it balance out
* Starting room temperature is 21°C (71F) and in the morning the temperature is around 19°C (66F)

![fridge]({{ assets_path }}/fridge.jpeg){: .aligncenter }

Working time was measured with 3 fill rates of the fridge:

1. Full refrigerator and freezer
  * Refrigerator 52 liters (aka 14% full)
  * Freezer 10 liters (aka 6%)
2. Half refrigerator and full freezer
  * Refrigerator 22 liters (aka 6% full)
  * Freezer 10 liters (aka 6%)
3. Half refrigerator and empty freezer
  * Refrigerator 22 liters (aka 6% full)
  * Freezer 2 liters (aka 1%)

## Observations

This fridge has 3 different types of noise:
* Loud, as it an old car is starting up
* Moderate
* Quiet

The loud noise seems to be the compressor starting up and adjusting the pressure. It's always followed by the quiet noise. And it works in short 1 minute bursts.

![Loud noise - waves]({{ assets_path }}/waves-loud.png)

The moderate noise usually works for 10-15 minutes.

![Moderate noise - waves]({{ assets_path }}/waves-moderate.png){: .alignright }

And there are times when all 3 are combined. The loud and the moderate noise are easy to distinguish, while the quiet can be hidden behind the moderate. Hence for this experiment I'll ignore the quiet noise.

![Mixed noise - waves]({{ assets_path }}/waves-mixed.png)

## Measurements

For audio recording, an iPhone 5s was used. The phone was placed on top of the fridge, this allowed for easy separation of ambient sounds as fridge sounds were most prominent.

The default VoiceMemo app was used to record the sounds. Audio files were then imported into Sonic Visualiser. Total working times were calculated.

![Day 3 noise measurement]({{ assets_path }}/day3.png)

## Results

|Fridge fill rate|Refrigerator|Freezer|Moderate noise|Loud noise
|---|---|---|---|---|
|Set-up 1|14%|6%|02:06:13|00:02:48|
|Set-up 2|6%|6%|02:22:50|00:03:13|
|Set-up 3|6%|1%|02:08:43|00:03:02|
|Set-up 3|6%|1%|02:09:43|-|
|Set-up 3|6%|1%|02:25:03|-|

_Given that the loud noise mostly didn't vary, I stopped counting it after 3rd measurement._

I tested first 2 set-ups only once each, while 3rd was tested 3 times to see if measurements are always consistent.
Unfortunately they're not. But regardless of that, total fridge working time didn't drastically increase, and for 3 days was similar.

## Conclusion

I wasn't able to prove that are loaded fridge will work less time (which is still a possibility).
But given that I was expecting at least 200% working time decrease, that definitely didn't happen.

There could be a difference in working time, but it's a very small proportion.

One could run each set-up multiple times to get a better average. Also loading the fridge much more (e.g. +30% of the volume) may show more prominent results.
