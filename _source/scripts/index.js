import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, browserHistory } from 'react-router';
import SidebarListing from './components/SidebarListing';
import SidebarStore from './modules/SidebarStore'
import { observe } from './modules/observables'

const routingStore = new RouterStore()
const sidebarStore = new SidebarStore()

const stores = {
  routing: routingStore,
  sidebar: sidebarStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

// Observables
observe(stores, history)

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route path='/' component={SidebarListing} />
      <Route path='/:page' component={SidebarListing} />
      <Route path='/*' component={SidebarListing} />
    </Router>
  </Provider>,
  document.querySelector('[data-element="sidebar-listing"]')
);
