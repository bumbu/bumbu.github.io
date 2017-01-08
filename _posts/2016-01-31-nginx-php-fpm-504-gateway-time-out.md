---
title: 'Nginx + php-fpm "504 Gateway Time-out"'
date: 2016-01-31T22:50:31+00:00
author: bumbu
layout: post
permalink: /nginx-php-fpm-504-gateway-time-out/
categories: development
---
If your Nginx + php-fpm returns 502 or 504 Error then you can try following:
<ul>
	<li><a href="http://stackoverflow.com/questions/23443398/nginx-error-connect-to-php5-fpm-sock-failed-13-permission-denied/23487409#23487409" target="_blank">Fix socket permissions</a></li>
	<li><a href="http://stackoverflow.com/a/14560181/1194327" target="_blank">Change communication between Nginx and php-fpm from socket to TCP</a></li>
</ul>
If these 2 didn't work (and you're still running php-fpm through TCP then check how many connections are open: <code>netstat | grep 9000</code>. If there are many <code>CLOSE_WAIT</code> connections then the solution is to set a <code>request_terminate_timeout=30s</code> in your <code>/etc/php5/fpm/pool.d/www.conf</code> file (like <a href="http://serverfault.com/a/179136" target="_blank">here</a>).

This will allow killing TCP connections that didn't close for different reasons after max 30 sec.
