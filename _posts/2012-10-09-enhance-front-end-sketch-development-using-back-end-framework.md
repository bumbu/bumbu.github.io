---
title: Enhance Front-End slicing development using a Back-End framework
date: 2012-10-09T21:19:20+00:00
author: bumbu
layout: post
permalink: /enhance-front-end-sketch-development-using-back-end-framework/
categories: blog
---
Before wrapping HTML on some CMS/Framework template system, it may be handy to make a full featured HTML slice. The only difference from final product is that it has no backend. So there are only pure HTML files. But doing so, it starts to annoy to write the same pieces of code many times when you have to create a new page that is slightly different from previous (headers, menus, footers).

And here comes a simple and nice solution: use some simple back end template engine. There are many of them, but we need one that is compatible with HTML, and as a perfect use case - generates processed template files.

I chose <a href="http://bcosca.github.com/fatfree/" target="_blank">PHP Fat-Free framework</a> for this purpose as it is simple, fast, runs on PHP (version &gt;= 5.3), template syntax is compatible with HTML, generated pages can be found in temp folder (but with hashed names) and routing is simple.

I took version 2.0.13 and removed many unnecessary things. So I left with:
<ul>
	<li>index.php - it will run our application</li>
	<li>.htaccess - for route rewriting</li>
	<li>temp/ - here are all temporary files, including generated template files</li>
	<li>lib/ - here I removed everything except:
<ul>
	<li>base.php</li>
	<li>f3markup.php</li>
	<li>graphics.php - may be used for manipulation with images and generating fake images</li>
	<li>icu.php - may be used for testing different labuages within template</li>
	<li>template.php</li>
</ul>
</li>
</ul>
The only modification that I did was for .htaccess files and index.php.

In .htaccess file I commented line with <em>RewriteBase /</em> as it gives errors on localhost.

index.php file looks like:
<pre class="language-php"><code>require __DIR__.'/lib/base.php';

F3::set('CACHE',FALSE);
F3::set('DEBUG',3);
F3::set('UI','./');

F3::route('GET /@page', 'show');
F3::route('GET /', 'show');

function show(){
  $page = F3::get('PARAMS["page"]') ? F3::get('PARAMS["page"]') : 'index';
  echo Template::serve($page.'html');
}

F3::run();</code></pre>
Now you can use all the sweetness from this framework <a href="http://bcosca.github.com/fatfree/#views-templates" target="_blank">template language</a>:
<ul>
	<li>include one file into another</li>
	<li>use loops</li>
	<li>use conditions</li>
	<li>use multilanguage</li>
	<li>and many other features that can give to you a full featured framework</li>
</ul>
How you should use it:
<ul>
	<li>add all this files into the folder with project on which you are working (it should be a folder callable through http requests, ex. localhost)</li>
	<li>name you HTML files with .html at the end, but request then without .html (ex. localhost/catalog)</li>
	<li>name your partial files with underscore at the beginning (it is not mandatory, but it is good as a convention)</li>
</ul>
