---
title: Making Emmet autocompletion work with SCSS in Sublime Text
date: 2015-11-13T13:30:27+00:00
author: bumbu
layout: post
permalink: /making-emmet-autocompletion-work-with-scss-in-sublime-text/
categories: blog development
---
If you have SCSS and Emmet plugins installed in Sublime Text but tab autocompletion (ex. dib -> display: inline-block) doesn't work then a solution to make it work is to update the `css_completions_scope` Emmet config value.

## 1. Find the completion scope of SCSS code

In order to find the completion scope place the cursor in Sublime right after the text you want to autocomplete/expand. Then press `Shift+Ctrl+P` and check what's the current scope in Sublime status bar (footer) ![sublime-scss-scope](http://bumbu.me/wp-content/uploads/2015/11/sublime-scss-scope.png) In my case it was `source.scss meta.property-list.scss`

## 2. Get default Emmet CSS completion scope settings

In sublime open default Emmet plugin settings: **Preferences -> Package Settings -> Emmet -> Settings - Default** and find the `css_completions_scope` option. In my case it was

```json
// List of scopes where Emmet CSS completions should be available
"css_completions_scope": "source.css - meta.selector.css - meta.property-value.css, source.scss - meta.selector.scss - meta.property-value.scss, source.less - meta.selector.css - meta.property-value.css",
```

## 3. Update Emmet CSS completion scope settings

Now we can update the `css_completions_scope` by adding the scope that we found earlier. For this open **Preferences -> Package Settings -> Emmet -> Settings - User** and add new scope to the list of completions scope:

```json
{
  "css_completions_scope": "source.css - meta.selector.css - meta.property-value.css, source.scss - meta.selector.scss - meta.property-value.scss - meta.poperty-list.css, source.less - meta.selector.css - meta.property-value.css, source.scss - meta.poperty-list.scss",
}
```

Now Emmet expanding should work as expected.
