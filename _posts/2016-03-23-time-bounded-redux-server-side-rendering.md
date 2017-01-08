---
title: Time-bounded server-side rendering in Redux
date: 2016-03-23T20:21:15+00:00
author: bumbu
layout: post
permalink: /time-bounded-redux-server-side-rendering/
categories: development
---
The beauty of any universal app is that you can write code one time and use it both on server and client. I'll use Redux as an example. A global overview of the data-flow looks like this:

1.   User requests a page from server
1.   Server runs the universal code (JS app)
1.   Universal code fetches data from API and returns a rendered HTML and state data
1.   Server returns a fully rendered page to the user which also contains a script with the universal code (JS app) and initial state data
1.   Browser renders the HTML
1.   Browser executes the universal code and re-renders the state again (but as the HTML is the same - there are no changes on page)
1.   Now any subsequent user action will not ask the server for a new page, but the universal code will call the API and update the data in page (single-page app functionality)

That's how most single-page universal applications work (or try to). The server render has few advantages:

*   It's often faster as the server and the API are often the same thing or close to each other. Also data-centers have on average much better connections than users
*   It's also faster for user as browsers are really good at rendering served HTML (while rendering with JS is significantly slower). Also users don't have to wait for JS and API requests
*   Good for search engines, parsers and users without JS

But there are 2 main problems with that:

*   You need to know when all the APIs' data were fetched
*   If API is really slow then we're better serving an empty HTML and making all request in browser. This way users will at least see a loading progress

## Knowing when all the APIs' data were fetched

In order to know when all the APIs' data were fetched - we have to register them somewhere. The right place to do that is in a middleware. We'll modify the [thunk middleware](https://github.com/gaearon/redux-thunk) so that it will track all API requests' promises.

## Aborting slow API requests

In a well designed application it will display it's state in an incremental way: if there is just one piece of information - it will display just that. At least your application shouldn't crash if some data is missing. Knowing that, we can wrap API fetches with a timeout. And if API fetches don't return within given time-frame - we'll [simply abort remaining API fetches]({{site.root}}/abortable-promises-for-api-requests/) and render the app with whatever information we have, and the missing information will be loaded on the client.

## Time-bounded server render

### Actions

API fetches should be initialized by actions. These actions should return a promise (that will resolve when the API request will success) and an abort function.

```js
import { getMe } from '../api/users'

const FETCH_USER_ME = 'FETCH_USER_ME'

export {
  FETCH_USER_ME
, loadMe
}

function actLoadMe(promise, abort = null) {
  let action = {
    type: FETCH_USER_ME
  , payload: {
      promise
    }
  , meta: {}
  }

  if (abort) {
    action.meta = {abort, track: true}
  }

  return action
}

function loadMe() {
  return (dispatch) => {
    let { promise, abort } = getMe()

    dispatch(actLoadMe(promise, abort));
  }
}
```

We're passing the promise as a payload and the abort function as a meta attribute.

### Middleware

Now the middleware. It is a thunk-based middleware which tracks those actions that have a `track: true` meta.

```js
function isPromise(val) {
  return val && typeof val.then === 'function';
}

let trackedActions = []
let aborted = false

function startTracking(action) {
  trackedActions.push(action)
}

function stopTracking(action) {
  if (trackedActions.indexOf(action) !== -1) {
    trackedActions.splice(trackedActions.indexOf(action), 1)
  }
}

/**
 * Calls abort for each trackable and empties trackable list
 *
 * @return {[type]} [description]
 */
export function abortAllTrackable() {
  aborted = true
  // Make a copy
  const actions = trackedActions.slice()

  // Stop tracking and abort
  for (var i = actions.length - 1; i >= 0; i--) {
    stopTracking(actions[i])
    actions[i].meta.abort()
  }
}

/**
 * Returns a promise that is resolved when all trackable are resolved
 *
 * @return {Promise}
 */
export function whenAllTrackable() {
  if (aborted) return Promise.reject('Aborted action by middleware')
  return Promise.all(trackedActions.map(action => action.payload.promise))
}

export default function thunkMiddleware({ dispatch, getState }) {
  return next => action => {
    // If not a promise then just pass next
    if (!action.payload || !isPromise(action.payload.promise)) {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      } else {
        return next(action)
      }
    }

    // Track
    if (action.meta && action.meta.track && action.meta.abort) {
      startTracking(action)
    }

    // Clone action without promise or meta
    let newAction = {
      type: action.type
    , payload: {
        ...action.payload
      }
    }
    delete newAction.payload.promise

    // Trigger start of action
    dispatch({...newAction, status: 'before'})

    return action.payload.promise.then(result => {
      stopTracking(action)
      dispatch({...newAction, payload: result, status: 'success'})
    }).catch(err => {
      console.error('Action promise error', err, action)
      console.error(err.stack)
      stopTracking(action)
      dispatch({...newAction, payload: err, status: 'error'})
    })
  }
}
```

### Components

Different components need different data. One way to manage that is to keep data dependencies in parent components. We'll define a `loadData` method on component that will be called when component mounts. Also we'll access this method from next code snippet.

```jsx
class Account extends Component {
  render() {
    const { items } = this.props

    return (
      <main>
        <ContentList
          items={items}
          />
      </main>
    )
  }

  loadData() {
    const { dispatch } = this.props

    dispatch(loadMe())
  }

  componentDidMount() {
    this.loadData()
  }
}
```

### Managing request on server

In Nodejs server we'll simply do:

```jsx
export default function handleRender(req, res) {
  match({history, routes: routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    // TODO handle errors and redirect

    hydrateData(store, renderProps, () => {
      const component = (
        <Provider store={store}>
            <RouterContext {...renderProps}/>
        </Provider>
      );

      res.send(renderFullPage(renderToString(component), store.getState()))
    }, 500) // Should return response max in .5sec, otherwise will return whatever is available
  })
}
```

Match is a function from `react-router` package.

### Time-limited waiting for data

Now the function that binds all these things together:

```js
/**
 * Hydrates data
 * Can have a max running time, after that data loaders (API calls) get halted
 *
 * @param  {Redux.Store}   store   Store to hydrate
 * @param  {object}   renderProps  react-router match resulting object
 * @param  {function} cb           Callback to be called when data is hydrated or aborted
 * @param  {number} timeout        Max time data loaders are allowed to run
 */
export function hydrateData(store, renderProps = null, cb = null, timeout = 0) {
  // Getting current component from renderProps
  if (renderProps && renderProps.components && renderProps.components.length > 1 && 'WrappedComponent' in renderProps.components[1] && 'loadData' in renderProps.components[1].WrappedComponent.prototype) {
    // Trick component loadData
    renderProps.components[1].WrappedComponent.prototype.loadData.call({props: store}, true)
  }

  if (cb || timeout > 0) {
    let timeoutHandle = null;
    let cbCopy = cb;

    // Calls cb just once
    function onComplete() {
      cbCopy && cbCopy()
      cbCopy = null
    }

    if (timeout > 0) {
      timeoutHandle = setTimeout(() => {
        // If data loading runs more longer than the timeout, then abort all pending and use the data from any completed requests
        onComplete()
        abortAllTrackable()
      }, timeout)
    }

    whenAllTrackable().then(() => {
      // Stop timeout
      timeoutHandle && clearTimeout(timeoutHandle)
      onComplete()
    })
  }
}
```

## Conclusion

There is quite a bit of code to do such a simple thing. But if you decide to go with a universal app - it should only make the user experience better and not sometimes better, sometimes worse.
