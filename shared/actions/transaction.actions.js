import apiCaller from '../../utils/apiCaller';


export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export function createTransaction(payload) {
  return {
    type: CREATE_TRANSACTION,
    payload
  }
}

export const CREATE_TRANSACTION_ERROR = 'CREATE_TRANSACTION_ERROR';
export function createTransactionError(error) {
  return {
    type: CREATE_TRANSACTION_ERROR,
    error
  }
}


export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export function getTransactions(payload) {
  return {
    type: GET_TRANSACTIONS,
    payload
  }
}


export const GET_TRANSACTIONS_ERROR = 'GET_TRANSACTIONS_ERROR';
export function getTransactionsError(payload) {
  return {
    type: GET_TRANSACTIONS_ERROR,
    payload
  }
}


export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export function deleteTransactionSuccess(payload) {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    payload
  }
}


export const DELETE_TRANSACTION_FAILURE = 'DELETE_TRANSACTION_FAILURE';
export function deleteTransactionFailure(error) {
  return {
    type: DELETE_TRANSACTION_FAILURE,
    error
  }
}


export const EDIT_TRANSACTION_SUCCESS = 'EDIT_TRANSACTION_SUCCESS';
export function editTransactionSuccess(payload) {
  return {
    type: EDIT_TRANSACTION_SUCCESS,
    payload
  }
}


export const EDIT_TRANSACTION_FAILURE = 'EDIT_TRANSACTION_FAILURE';
export function editTransactionFailure(error) {
  return {
    type: EDIT_TRANSACTION_FAILURE,
    error
  }
}


export function fetchTransactions() {
  return (dispatch) => {
    return apiCaller('transactions')
      .then(payload => dispatch(getTransactions(payload)))
      .catch(err => dispatch(getTransactionsError(err)));
  }
}


export function fetchCreateTransaction(data) {
  return (dispatch) => {
    return apiCaller('transactions', 'post', {transaction: data})
      .then(payload => dispatch(createTransaction(payload)))
      .catch(err => dispatch(createTransactionError(err)));
  }
}


export function fetchDeleteTransaction(id) {
  return (dispatch) => {
    return apiCaller(`transactions/${id}`, 'delete')
      .then(payload => dispatch(deleteTransactionSuccess(payload)))
      .catch(err => dispatch(deleteTransactionFailure(err)));
  }
}


export function fetchEditTransaction(transaction) {
  console.log('fetchEditTransaction:', transaction);
  return (dispatch) => {
    return apiCaller(`transactions/${transaction._id}`, 'put', {transaction})
      .then(payload => dispatch(editTransactionSuccess(payload)))
      .catch(err => dispatch(editTransactionFailure(err)));
  }
}
