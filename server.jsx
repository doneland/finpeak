import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './shared/routes';
import fetchComponentData from './shared/lib/fetchComponentData';
import {Provider} from 'react-redux';
import configureStore from './shared/store/configureStore';
import todosRoutes from './server/routes/todos';
import transactionRoutes from './server/routes/transaction.routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


// Initialize the Express App.
const app = express();


// Set native promises as mongoose promise.
mongoose.Promise = global.Promise;


// MongoDB connection.
const MONGODB_URL = 'mongodb://localhost:27017/finpeak'
mongoose.connect(MONGODB_URL, (err) => {
  if (err) {
    console.error('Please make sure Mongodb is installed and running!');
    throw err;
  }
});


// Apply body Parser and server public assets and routes.
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', todosRoutes);
app.use('/api', transactionRoutes);

app.use((req, res) => {
  const location = createLocation(req.url);
  const store = configureStore();
  console.log('State before match:', store.getState());

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    console.log('renderProps:', renderProps.components);
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    function renderView() {
      console.log('Render view.');
      const InitialComponent = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const initialState = store.getState();
      console.log('match->initialState:', store.getState());
      const componentHTML = renderToString(InitialComponent);

      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Isomorphic Redux Demo</title>
            <script type="application/javascript">
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
          </head>
          <body>
            <div id="react-view">${componentHTML}</div>
            <script type="application/javascript" src="/bundle.js"></script>
          </body>
        </html>`;

        return HTML;
    }


    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
    });
});

export default app;
