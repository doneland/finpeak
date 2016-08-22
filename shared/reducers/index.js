import {combineReducers} from 'redux';

import todos from './todos';
import transactions from './transaction.reducer';

const rootReducer = combineReducers({
  todos,
  transactions
});

export default rootReducer;
