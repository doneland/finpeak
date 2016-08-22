import React from 'react';
import {Route} from 'react-router';

import App from './components';
import Home from './components/Home';
import Transactions from './components/Transactions';


export default (
  <Route name="app" component={App} path="/">
    <Route component={Home} path="home" />
    <Route component={Home} path="home/:userId" />
    <Route component={Transactions} path="transactions" />
  </Route>
);
