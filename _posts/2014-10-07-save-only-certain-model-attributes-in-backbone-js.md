---
title: Save only certain model attributes in Backbone.js
date: 2014-10-07T13:05:20+00:00
author: bumbu
layout: post
permalink: /save-only-certain-model-attributes-in-backbone-js/
categories: development
---
When calling model.save() in Backbone.js all model attributes will be persisted (sent to the server).

It may be done by passing a specific option argument to <code>toJSON</code> method. It is done in <code>save</code> method. You may create a base class and extend all your models from that base class. This way all extended classes that will have <code>whitelistSaveAttributes</code> will whitelist attributes on saving:
<pre class="language-coffeescript line-numbers"><code>whitelistSaveAttributes: ['body', 'message']

# Proxy save method
save: (key, val, options)-&gt;
  # If key is an object then second argument is options
  if not key? or typeof key is 'object'
    options = val or {}
    val = options

  if @whitelistSaveAttributes? and @whitelistSaveAttributes.length
    options.JSONType = 'save'

  Backbone.Model.prototype.save.call(this, key, val, options)

# Check for attributes that are functions
toJSON: (options = {})-&gt;
  json = Backbone.Model.prototype.toJSON.call(this)

  # On save send only whitelisted attributes
  if options?.JSONType is 'save'
    json = _.pick.apply(this, [json].concat(@whitelistSaveAttributes))

  return json</code></pre>
