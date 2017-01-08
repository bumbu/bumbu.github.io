---
title: Organising NodeJS' Error Handling Hell with IcedCoffeeScript
date: 2013-12-05T14:11:42+00:00
author: bumbu
layout: post
permalink: /organising-nodejs-error-handling-hell-with-icedcoffeescript/
categories: development
---
Let's suppose you are building a NodeJS application. Lets focus on only one request (let it be our custom authentication despite of the fact that there are ready to use modules such as Passport). After you handled all edge cases your code may look like this:
<pre class="language-coffeescript"><code>app.post '/api/authentication/', (req, res)-&gt;
  User.findOne
    email: req.body.email
    , (error, user)-&gt;
      if error
        res.json 504,
          success: false
          error_message: 'Database error while searching for user'
      else
        if not user
          res.json 403,
            success: false
            error_message: 'User with given email was not found' + req.body.email
        else
          if user.authenticate req.body.password
            # Save into session
            req.session.userId = user.id
            res.json
              success: true
              user: user.getPublicData()
          else
            res.json 403,
              success: false
              error_message: 'Email or password are wrong. Please check them and try one more time'</code></pre>
It looks quite deep. We can make it <em>less deep</em> by joining all if/else statements into one big if/else-if/else block:
<pre class="language-coffeescript"><code>app.post '/api/authentication/', (req, res)-&gt;
  User.findOne
    email: req.body.email
    , (error, user)-&gt;
      if error
        res.json 504,
          success: false
          error_message: 'Database error while searching for user'
      else if not user
        res.json 403,
          success: false
          error_message: 'User with given email was not found' + req.body.email
      else if user.authenticate req.body.password
        # Save into session
        req.session.userId = user.id
        res.json
          success: true
          user: user.getPublicData()
      else
        res.json 403,
          success: false
          error_message: 'Email or password are wrong. Please check them and try one more time'</code></pre>
Now this is much better, but still there is room for improvement. Lets add following function:
<pre class="language-coffeescript"><code>errorHandler = {}
errorHandler.json = (res, code, message)-&gt;
  res.json code,
    success: false
    error_message: message</code></pre>
Now we can rewrite our previous code to:
<pre class="language-coffeescript"><code>app.post '/api/authentication/', (req, res)-&gt;
  User.findOne
    email: req.body.email
    , (error, user)-&gt;
      return errorHandler.json res, 504, 'Database error while searching for user' if error
      return errorHandler.json res, 403, 'User with given email was not found' if not user
      return errorHandler.json res, 403, 'Email or password is wrong' if not user.authenticate req.body.password

      # Save into session
      req.session.userId = user.id
      res.json
        success: true
        user: user.getPublicData()</code></pre>
This looks much better then what we have at the beginning. But can we do even better? Yes we can! Let's use the power of ice (or simply IcedCoffeeScript). By awaiting the findOne user callback we can change our previous code into this piece of beauty:
<pre class="language-coffeescript"><code>app.post '/api/authentication/', (req, res)-&gt;
  await User.findOne {email: req.body.email} , defer(error, user)

  return errorHandler.json res, 504, 'Database error while searching for user' if error
  return errorHandler.json res, 403, 'User with given email was not found' if not user
  return errorHandler.json res, 403, 'Email or password is wrong' if not user.authenticate req.body.password

  # Save into session
  req.session.userId = user.id
  res.json
    success: true
    user: user.getPublicData()</code></pre>
This way we shortened our code more then 2 times, changed maximal level of code depth from 7 to 2 thus making the code much more beautiful, readable and maintainable.
