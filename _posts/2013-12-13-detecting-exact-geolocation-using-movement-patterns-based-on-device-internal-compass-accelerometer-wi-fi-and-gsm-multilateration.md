---
title: Detecting exact geolocation using movement patterns based on device internal compass, accelerometer, Wi-Fi and GSM multilateration
date: 2013-12-13T08:51:01+00:00
author: bumbu
layout: post
permalink: /detecting-exact-geolocation-using-movement-patterns-based-on-device-internal-compass-accelerometer-wi-fi-and-gsm-multilateration/
categories: blog
---
<em>This is a rough draft of an idea. It may be already implemented or it may have conceptual flows due to my poor knowledge of the domain.</em>

GPS is one of the heaviest antenna drainers due to its design. Besides of that GPS may not be always available because of the poor signal or because of the lack of software in device. Very often there is no need in very high accuracy and an error of few tens of meters is still functional. So any solution which enables geolocation and which uses less resources may be a good alternative to GPS (or any other navigation systems).

One such solution is location by Wi-Fi antennas. Usually their range is 10-150m so having a database of different Wi-Fi locations may give you an average location precision (usually 40-150m).

Another solution is to use phone network (GSM/WDCMA/UMTS). Using multilateration, GSM TA (Timing Advance) and having a database of GSM antennas locations it is possible to achieve 0.5 - 2km accuracy. In fact multilateration may give much better results, but I have no idea of how much it is.

Having approximate location based on Wi-Fi and GSM gives us a geo-fence which should be smaller then 1km<sup>2</sup>. By tracking user movement (presumably using internal compass and accelerometer) it is possible to create an approximate user's path. In fact it should be necessary to have a path with at least few bends or curves. More bends or curves are contained in path - the more accurate the result will be. What we have to do now is to match given path with geographical map of roads for given region (yes, it is one more prerequisite). By having a limited area to scan, knowing location walkable routes and own path is should be quite easy to locate almost exact user position.
<h2>Sources</h2>
<ol>
	<li>(paper) <a href="http://web.it.kth.se/~matsbror/exjobb/msc_theses/oskar_thesis_report.pdf">Positioning of a cellular phone using the SIM</a></li>
	<li>(report) <a href="http://www.nature.com/srep/2013/130325/srep01376/full/srep01376.html">Unique in the Crowd: The privacy bounds of human mobility</a></li>
	<li>(stackoverflow) <a href="http://stackoverflow.com/a/12280650/1194327">How to improve accuracy of indoor positioning</a></li>
	<li>(article) <a href="http://habrahabr.ru/post/157619/">Технологии идентификации и позиционирования в режиме реального времени</a></li>
</ol>
