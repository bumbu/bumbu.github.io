---
title: Simulating noSQL in Django that uses a SQL database
date: 2012-08-07T22:54:13+00:00
author: bumbu
layout: post
permalink: /simulating-nosql-in-django-that-uses-sql-database/
categories: development
---
In one of the project we were working on a noSQL database would make sense for user data. But we were stuck with a server that had only MySQL on it.

We tried to solve that by successfully simulating a noSQL (document) database by using a SQL (RDBSM) database.

For that a proxy Django Model was used that can be used in the same way as normal Django Models (get, set, save, delete) work but with an \*infinite vertical storage.

Following 2 Django Models were used for that:

```python
class User(models.Model):
  name = models.CharField(max_length=15)
  surname = models.CharField(max_length=31)
  email = models.EmailField()

class UserMeta(models.Model):
  user = models.ForeignKey(User)
  key = models.CharField(max_length=15)
  value = models.TextField()
```

The task was to have a model object with following functionality:

* accessing user attributes and meta attributes as they where normal model attributes (ex `user.age`)
* setting user attributes and meta attributes as they where nowmal model attributes (ex `user.age = 25`)
* autosaving attributes in the database (on set and delete)
* deleting meta attributes as they where normal model attributes (ex `del user.age`)
* deleting model object should also delete all its meta attributes  (`del user`)

Following class was used as a proxy for the model:

```python
class UserExtended():
  def __init__(self, user_id=0):
    if user_id <= 0:
      self.user = User()
    else:
      try:
        self.user = User.objects.get(id=user_id)
      except User.DoesNotExist:
        self.user = User()

  def __setattr__(self, key, value):
    if key == "user":
      self.__dict__[key] = value
    elif hasattr(self.user, key):
      setattr(self.user, key, value)
      salf.user.save()
    else:
      return self.setMeta(key, value)

  def __getattr__(self, key):
    if hasattr(self.user, key):
      return getattr(self.user, key)
    else:
      return self.getMeta(key)

  def __delattr__(self, key):
    if key == "user":
      del self.__dict__[key]
    else:
      self.delMeta(key)

  def __del__(self):
    self.user.delete()
    # delete all attributes
    UserMeta.objects.filter(user=self.user).delete()

  def hasattr(self, key):
    if hasattr(self.user, key):
      return True
    else:
      try:
        getattr(self, key)
        return True
      except:
        return False

  def setMeta(self, key, value):
    try:
      user_meta = UserMeta.objects.get(user=self.user, key=key)
    except UserMeta.DoesNotExist:
      user_meta = UserMeta(user=self.user, key=key) # new meta
    except:
      raise AttributeError("unknown error")

    user_meta.value = value
    user_meta.save()

  def getMeta(self, key):
    try:
      meta = UserMeta.objects.get(user=self.user, key=key)
      return meta.value
    except UserMeta.DoesNotExist:
      raise AttributeError("no such meta")
    except UserMeta.MultipleObjectsReturned:
      raise AttributeError("multiple objects returned")
    except:
      raise AttributeError("unknown error")

    raise AttributeError()

  def delMeta(self, key):
    try:
      return UserMeta.objects.filter(user=self.user, key=key).delete()
    except:
      return False
```
