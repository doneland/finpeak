import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from 'routes';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import configureStore from '../shared/store/configureStore';

const history = createBrowserHistory();
const store   = configureStore(window.__INITIAL_STATE__);
console.log(store.getState());


render(
  <Provider store={store}>
      <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
