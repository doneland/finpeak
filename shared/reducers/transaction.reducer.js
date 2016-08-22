import * as actions from '../actions/transaction.actions';


export default function transactionReducer(state={}, action) {
  switch(action.type) {
  case actions.CREATE_TRANSACTION:
    // TODO: create transaction.
  case actions.GET_TRANSACTIONS:
    return getTransactions(state, action);
  default:
    return state;
  }
}


/**
 * Get all the transactions.
 */
function getTransactions(state, action) {
  const nextState = Object.assign({}, {state}, action.payload);
  return nextState;
}
