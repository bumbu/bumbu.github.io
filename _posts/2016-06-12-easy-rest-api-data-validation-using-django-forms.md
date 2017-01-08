---
title: Easy REST API data validation using Django Forms
date: 2016-06-12T21:50:16+00:00
author: bumbu
layout: post
permalink: /easy-rest-api-data-validation-using-django-forms/
categories: development
---
If your Django application has a REST API and you're not using Django REST framework (or a similar framework) then you'll find yourself writing lots of code for validating incoming data. But there is a simple way to do that using Django Forms.

### Django ModelForm

If your API matches a model then use Django ModelForm class.

Say you have following `Item` class:
```python
from django.forms import ModelForm
from django.models import Model

class Item(Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(min=0, max=100)
    selected = models.BooleanField(default=False)

class ItemForm(ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'quantity', 'selected']
```

Then validating the data is simply done by checking if the form is valid:
```python
import json
from django.http import JsonResponse

request_data = json.load(request) # TODO trycach

form = ItemForm(order, request_data)

if form.is_valid():
    form.save()
    return JsonResponse(order.to_dict())
else:
    return JsonResponse('Invalid format', status=400)
```

### Django Form

In case that your model doesn't match API format then you can use a Django Form to validate the data. After that you can save the data manually into corresponding models.

The code for form has the same attributes as previous ModelForm:

```python
from django.forms import Form

class ItemForm(Form):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField(min=0, max=100)
    selected = models.BooleanField(default=False)
```

And the code for validation is basically the same:
```python
import json
from django.http import JsonResponse

request_data = json.load(request) # TODO trycach

form = ItemForm(request_data)

if form.is_valid():
    # TODO save data into models
    return JsonResponse('{}') # TODO
else:
    return JsonResponse('Invalid format', status=400)
```

Then only thing missing here is saving data and senging the response data. But that's different from case to case.
