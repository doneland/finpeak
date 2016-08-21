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
import bodyParser from 'body-parser';

// Initialize the Express App.
const app = express();

// Apply body Parser and server public assets and routes.
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', todosRoutes);

app.use((req, res) => {
  const location = createLocation(req.url);
  const store = configureStore();

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    function renderView() {
      const InitialComponent = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const initialState = store.getState();
      console.log('Setting initial state:', initialState);

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
