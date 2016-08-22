import React from 'react';
import {connect} from 'react-redux';

import * as transactionActions from '../actions/transaction.actions';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';


class Transactions extends React.Component {

  static needs = [
    transactionActions.fetchTransactions
  ]

  render() {
    const {transactions, createTransaction} = this.props;

    return (
      <div>
        <h1>TRANSACTIONS</h1>
        <TransactionForm onSubmit={createTransaction} />
        <hr />
        <TransactionTable transactions={transactions} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('Transactions container state:', state);
  return {
    transactions: state.transactions.transactions
  }
}


const mapActionsToProps = {
  createTransaction: transactionActions.createTransaction
}


export default connect(mapStateToProps, mapActionsToProps)(Transactions);
