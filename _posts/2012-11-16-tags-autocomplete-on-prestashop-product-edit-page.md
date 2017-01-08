---
title: Tags autocomplete on Prestashop product edit page
date: 2012-11-16T12:21:17+00:00
author: bumbu
layout: post
permalink: /tags-autocomplete-on-prestashop-product-edit-page/
categories: development
---
As by now, Prestashop (1.5.6.1) has no tags autocomplete in admin panel on product edit page. This feature may be very handy especially when you have many tags and do not want to duplicate their meanings.
<h2>For PrestaShop 1.5.x</h2>
<em>If this method doesn't work for you then try next method for older Prestashop 1.5.x versions.</em>

There are only 3 files that should be edited for that:

Create (or add) file <em>override/classes/Tag.php</em> with following contents:
<pre class="language-php"><code>&lt;?php
class Product extends ProductCore
{
  public static function getTags($id_lang, $nb = 10) {
    return Db::getInstance(_PS_USE_SQL_SLAVE_)-&gt;ExecuteS('
      SELECT t.`name`
      FROM `'._DB_PREFIX_.'tag` t
      WHERE t.`id_lang` = '.(int)$id_lang.'
      ORDER BY t.`name` ASC
      LIMIT 0, '.(int)$nb);
  }
}</code></pre>
Then create file<em> override/classes/Product.php</em> with following contents:
<pre class="language-php"><code>&lt;?php
class Tag extends TagCore
{
  public function getAllTags($id_lang = 0, $qty = 10){
    if(!$id_lang){
      $context = Context::getContext();
      $id_lang = $context-&gt;language-&gt;id;
    }

    return Tag::getTags($id_lang, $qty);
  }
}</code></pre>
If you created any of these 2 files then you'll have to remove file <em>cache/class_index.php</em> as otherwise these functions will not be accessible until you'll do that.

We'll access this function directly from template (which is wrong following MVC idea). A better way to do this is to assign tags values to <em>smarty</em> from <em>ProductController</em>. But this is for those passioned of rules.

The last thing that we have to add is
<pre class="language-php"><code>{literal}
&lt;script type="text/javascript"&gt;
  $().ready(function () {
    var id_lang = '{/literal}{$language.id_lang}{literal}'
      , availableTags = []
      , $input = $('#tags_' + id_lang)

    {/literal}
    {foreach from=$product-&gt;getAllTags($language.id_lang) item=tag}
      availableTags.push("{$tag.name}")
    {/foreach}
    {literal}

    $input
      .tagify({
        delimiters: [13,44]
      , addTagPrompt: '{/literal}{l s='Add tag' js=1}{literal}'
      })
    $input.tagify('inputField')
      .autocomplete(availableTags, {
        matchContains: true
      })
      .result(function(event, data, formatted) {
        var values = $input.tagify('serialize').replace(', ', ',').split(',')
        if (data.length &amp;&amp; !~values.indexOf(data[0])) {
          $input.tagify('add', data[0])
        } else {
          $input.tagify('inputField').val('')
        }
      })

    $({/literal}'#{$table}{literal}_form').submit( function() {
      $(this).find('#tags_' + id_lang).val($input.tagify('serialize'));
    });
  });
&lt;/script&gt;
{/literal}</code></pre>
It should replace last <em>literal</em> tags' contents in file <em>admin/themes/default/template/controllers/products/informations.tpl</em>. These are lines 378 to 388 for me.

But you should take care about last change as we did it in default template, so anytime you'll update your Prestashop, this file may be overridden. One way to deal with this case is to create a custom admin template, so nothing will bother you. But in case that if you'll want latest admin template updates - you'll have to merge differences, which may take a lot of time.
<h2>For PrestaShop 1.5.2 and lower</h2>
There are only 3 or 4 (depends on version) files that should be edited for that:

<em>classes/Tag.php - </em>apply <a href="https://github.com/PrestaShop/PrestaShop/commit/bd4085ac20c86ad3b4c45a83943ff63e13e1a1b0" target="_blank">this patch</a> in case you are on stable version 1.5.2.0 or lower.

Add  <em>override/classes/Tag.php</em> and<em> override/classes/Product.php</em> as in previous method.

The last thing that we have to add is
<pre class="language-js"><code>&lt;script type="text/javascript"&gt;
  $(function(){
    {foreach from=$languages item=language}
      var availableTags_{$language.id_lang} = []
      {foreach from=$product-&gt;getAllTags($language.id_lang) item=tag}
        availableTags_{$language.id_lang}.push("{$tag.name}")
      {/foreach}

      $('#tags_{$language.id_lang}').autocomplete(availableTags_{$language.id_lang}, {
        multiple: true
      , matchContains: true
      })
    {/foreach}
  })
&lt;/script&gt;</code></pre>
It should be aded into <em>admin/themes/default/template/controllers/products/informations.tpl</em> right after previous script declaration. It is line 83 for me.

But you should take care about last change as we did it in default template, so anytime you'll update your Prestashop, this file may be overridden. One way to deal with this case is to create a custom admin template, so nothing will bother you. But in case that if you'll want latest admin template updates - you'll have to merge differences, which may take a lot of time.
<h2>For PrestaShop 1.4.x</h2>
For version 1.4.x (tested on 1.4.9) of PrestaShop we have to change 2 files:

patch<em> classes/Tag.php around line 99</em>
<pre class="language-php"><code>$tmpTab = array_filter(array_unique(array_map('trim', preg_split('/,/', $string, NULL, PREG_SPLIT_NO_EMPTY))));</code></pre>
also add in this file to TagCore class following function:
<pre class="language-php"><code>public static function getTags($id_lang, $nb = 10) {
  return Db::getInstance(_PS_USE_SQL_SLAVE_)-&gt;ExecuteS('
    SELECT t.`name`
    FROM `'._DB_PREFIX_.'tag` t
    WHERE t.`id_lang` = '.(int)$id_lang.'
    ORDER BY t.`name` ASC
    LIMIT 0, '.(int)$nb);
}</code></pre>
<em>admin/tabs/AdminProducts.php</em>
<pre class="language-php"><code>$tags_lang = Tag::getTags($language['id_lang'], 999);
$tags_array = array();
foreach($tags_lang as $tag){
  $tags_array[] = $tag['name'];
}
echo '&lt;script type="text/javascript"&gt;
      $(function(){
        $("#tags_'.$language['id_lang'].'").autocomplete(["'.implode('","', $tags_array).'"], {
          multiple: true
        , matchContains: true
        })
      })
      &lt;/script&gt;';</code></pre>
It should be added on line 2915 in tags foreach loop. On first row you can see a magic <em>999</em> number - it is max number of tags that will be preloaded for each language.
