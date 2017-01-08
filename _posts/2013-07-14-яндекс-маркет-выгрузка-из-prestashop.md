---
title: Яндекс Маркет выгрузка из Prestashop
date: 2013-07-14T10:50:26+00:00
author: bumbu
layout: post
permalink: '/%d1%8f%d0%bd%d0%b4%d0%b5%d0%ba%d1%81-%d0%bc%d0%b0%d1%80%d0%ba%d0%b5%d1%82-%d0%b2%d1%8b%d0%b3%d1%80%d1%83%d0%b7%d0%ba%d0%b0-%d0%b8%d0%b7-prestashop/'
categories: development
---
Для выгрузки товаров из Prestashop в Яндекс маркет можно воспользоватся модулем <a href="http://prestalab.ru/eksport-import/23-vygruzka-v-jandeks-market-lite.html" target="_blank">Выгрузка в Яндекс Маркет (Lite)</a>.

При попытке установить модуль версии 1.1 на Prestashop 1.5.3 который стоит на PHP 5.4 Strict Standards ON у меня повалились ошибки.

При попытке генерацииYML выпадает <b>Strict Standards</b>: Declaration of ymlCatalog::generate() should be compatible with ymlElement::generate($close = true) in <b>...\modules\yamarket\classes\ymlCatalog.php</b> on line <b>16</b>

Эту ошибку легко поправить так как к ней идёт подсказка что делать. Правим <b>yamarket\classes\ymlCatalog.php</b> и заменяем
<code>public function generate()</code>
на
<code>public function generate($close = true)</code>
Следующая ошибка <b>Notice</b>: Trying to get property of non-object in ...<b>\classes\Category.php</b> on line <b>560</b>. Правим этот файл и заменяем
<pre class="language-php"><code>if ($check_access &amp;&amp; !$this-&gt;checkAccess($context-&gt;customer-&gt;id))</code></pre>
на
<pre class="language-php"><code>if ($check_access &amp;&amp; is_object($context-&gt;customer) &amp;&amp; !$this-&gt;checkAccess($context-&gt;customer-&gt;id))</code></pre>
Ещё есть специфическая ошибка на странице динамически генерируемого YML файла.
<pre class="language-none"><code>This page contains the following errors:
error on line 201 at column 39: Extra content at the end of the document
Below is a rendering of the page up to the first error.</code></pre>
Это потому что у меня шаблон изменён и в файле layouts.php (который подгружается как файл шаблона по умолчанию) есть изменения которые рассчитывают на присутствие некоторых переменных в шаблоне. Править можно двумя способами:
<ol>
  <li><span style="line-height: 13px;">Проверять в шаблоне на наличие нужных переменных и только тогда выводить их</span></li>
  <li>Сделать небольшое изменение в модуле</li>
</ol>
Пойдём по второму пути. Для этого нужно (не обязательно но будет проще) изменить файл <strong>yamarket.php</strong>. Заменить строки
<pre class="language-php"><code>$this-&gt;fields_value['url2'] = $this-&gt;context-&gt;link-&gt;getModuleLink('yamarket', 'generate', array(), true);
$this-&gt;fields_value['url3'] = $this-&gt;context-&gt;link-&gt;getModuleLink('yamarket', 'generate', array('cron'=&gt;'1'), true);</code></pre>
на
<pre class="language-php"><code>$this-&gt;fields_value['url2'] = $this-&gt;context-&gt;link-&gt;getModuleLink('yamarket', 'generate', array('ajax'=&gt;'true'), true);
$this-&gt;fields_value['url3'] = $this-&gt;context-&gt;link-&gt;getModuleLink('yamarket', 'generate', array('cron'=&gt;'1', 'ajax'=&gt;'true'), true);</code></pre>
Теперь ссылка у нас будет по типу <em>http://localhost/module/yamarket/generate?ajax=true</em>
