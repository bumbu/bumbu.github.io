---
title: Always display WooCommerce variable product price
date: 2013-06-25T11:39:24+00:00
author: bumbu
layout: post
permalink: /display-always-woocommerce-variable-product-price/
categories: development
---
If all prices for a product's variations are the same then variation price will not be displayed. But if it is the only displayed price then you are in trouble.
To overcome this situation you can edit your template functions.php file like this:
<pre class="language-php"><code>// Display variation's price even if min and max prices are the same
add_filter('woocommerce_available_variation', function ($value, $object = null, $variation = null) {
  if ($value['price_html'] == '') {
    $value['price_html'] = '&lt;span class="price"&gt;' . $variation-&gt;get_price_html() . '&lt;/span&gt;';
  }
  return $value;
}, 10, 3);</code></pre>
