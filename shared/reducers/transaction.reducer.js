import * as actions from '../actions/transaction.actions';


export default function transactionReducer(state={}, action) {
  switch(action.type) {
  case actions.CREATE_TRANSACTION:
    return createTransaction(state, action);
  case actions.GET_TRANSACTIONS:
    return getTransactions(state, action);
  case actions.DELETE_TRANSACTION_SUCCESS:
  case actions.DELETE_TRANSACTION_FAILURE:
    return deleteTransaction(state, action);
  case actions.EDIT_TRANSACTION_SUCCESS:
  case actions.EDIT_TRANSACTION_FAILURE:
    return editTransaction(state, action);
  default:
    return state;
  }
}


/**
 * Get all the transactions.
 */
function getTransactions(state, action) {
  const nextState = Object.assign({}, state, action.payload);
  return nextState;
}


/**
 * Create new transaction.
 */
function createTransaction(state, action) {
  return Object.assign({}, state, action.payload);
}


/**
 * Delete transaction.
 */
function deleteTransaction(state, action) {
  switch(action.type) {
  case actions.DELETE_TRANSACTION_SUCCESS:
    return Object.assign({}, state, action.payload);
  case actions.DELETE_TRANSACTION_FAILURE:
    return Object.assign({}, state, action.error);
  default:
    return state;
  }
}


/**
 * Edit transaction.
 */
function editTransaction(state, action) {
  switch (action.type) {
  case actions.EDIT_TRANSACTION_SUCCESS:
    return Object.assign({}, state, action.payload);
  case actions.EDIT_TRANSACTION_FAILURE:
    return Object.assign({}, state, action.error);
  default:
    return state;
  }
}
