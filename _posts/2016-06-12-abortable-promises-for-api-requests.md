---
title: Abortable promises for API requests
date: 2016-06-12T21:22:12+00:00
author: bumbu
layout: post
permalink: /abortable-promises-for-api-requests/
categories: development
---
In [Time bounded server side rendering in Redux](http://bumbu.me/time-bounded-redux-server-side-rendering/) you can see that along with an API request promise, there is also an `abort` function. When called  - that function will abort ongoing API request.

You may want an abortable promise for different reasons, but those used for asynchonous requests seem to benefit the most. One of such use-cases if canceling previous request if a new request was dispatched (otherwise you may first get new data and then the old one).

### Abortable promises

Making a promise abortable is actually very easy. In this example we're using `jQuery.ajax` for managing ajax requests.

```js
function constructRequest(options) {
  const request = jQuery.ajax(options)

  const promise = new Promise((resolve, reject) => {
    request.then(function(data) {
      resolve(data)
    })

    request.fail(function(jqXHR, textStatus) {
      reject(textStatus)
    })
  })

  const abort = () => request.abort()

  return {abort, promise}
}

// Calling the function returns the abort function and a promise
const { abort, promise } = constructRequest({
  url: 'http://bumbu.me',
  method: 'GET'
})
```
{: data-line="6,10,14"}

So basically you have to wrap your async processor into a promise, and call its `resolve` and `reject` provided functions appropriately. Also provide a proxy into aborting mechanism.
