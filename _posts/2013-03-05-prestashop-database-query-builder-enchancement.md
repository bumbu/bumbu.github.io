---
title: Prestashop database query builder enchancement
date: 2013-03-05T15:09:06+00:00
author: bumbu
layout: post
permalink: /prestashop-database-query-builder-enchancement/
categories: development
---
Prestashop (right now latest version is 1.5.3) has some sort of ORM, but it loads a hell lot of things, and is usable only for one object mapping. In case you want to retrieve (only) something from database using conditionals and joins, or simply getting more than one row, you have 2 options:
<ul>
	<li><span style="line-height: 13px;">Write your query using raw SQL</span></li>
	<li>Use DbQuery instance</li>
</ul>
Here is an example of query using DbQuery:
<pre class="language-php"><code>$query = new DbQuery();
$query
  -&gt;select('*')
  -&gt;from('state')
  -&gt;where('`active` = 1')
  -&gt;orderBy('`name` ASC')
  ;

$states = Db::getInstance()-&gt;executeS($query);</code></pre>
But it is annoing to instantiate each time new DbQuery, so by adding these simple lines to <em>ovveride/classes/db/DbQuery.php</em>
<pre class="language-php"><code>class DbQuery extends DbQueryCore
{
  public static function query(){
    return new self();
  }
}</code></pre>
we'll be able to write the same query a bit faster:
<pre class="language-php"><code>$states = Db::getInstance()-&gt;executeS(
  DbQuery::query()
    -&gt;select('*')
    -&gt;from('state')
    -&gt;where('`active` = 1')
    -&gt;orderBy('`name` ASC')
);</code></pre>
