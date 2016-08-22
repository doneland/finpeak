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


export function fetchTransactions() {
  console.log('Call->fetchTransactions');
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
