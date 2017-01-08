---
title: Define an array in Django templates
date: 2016-02-01T21:48:27+00:00
author: bumbu
layout: post
permalink: /define-an-array-in-django-templates/
categories: development
---
In case that you need to define an array in Django templates - it is not possible to do directly. Instead you can define a string with your values joined by space. Then when you need to use the array, you split the string and you have your array. For example if you want to check if an icon is available then you can do

{% raw %}
```python
{% with my_array='one two three five' %}
  {% if icon in my_array.split %}
    <i class="icon icon-{{icon}}"></i>
  {% else %}
    no such icon
  {% endif %}
{% endwith %}
```
{% endraw %}
