import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(
    thunkMiddleware
  ));

  // For hot reloading reducer
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }


  return store;
}
