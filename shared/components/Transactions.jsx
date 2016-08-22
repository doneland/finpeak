import React from 'react';
import {connect} from 'react-redux';

import * as transactionActions from '../actions/transaction.actions';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';


class Transactions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editableTransaction: null
    };
    this.handleEditTransaction = this.handleEditTransaction.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
  }

  static needs = [
    transactionActions.fetchTransactions
  ]

  editTransaction(transaction) {
    this.setState({editableTransaction: transaction});
  }

  handleEditTransaction(transaction) {
    const {fetchEditTransaction} = this.props;
    this.setState({editTransaction: null});
    return fetchEditTransaction(transaction);
  }

  render() {
    const {
      transactions,
      fetchCreateTransaction,
      fetchDeleteTransaction,
      fetchEditTransaction
    } = this.props;

    return (
      <div>
        <h1>TRANSACTIONS</h1>
        <TransactionForm
          onCreate={fetchCreateTransaction}
          onEdit={this.handleEditTransaction}
          transaction={this.state.editableTransaction} />
        <hr />
        <TransactionTable
          transactions={transactions}
          onDelete={fetchDeleteTransaction}
          onEdit={this.editTransaction}  />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    transactions: state.transactions.transactions
  }
}


const mapActionsToProps = {
  fetchCreateTransaction: transactionActions.fetchCreateTransaction,
  fetchDeleteTransaction: transactionActions.fetchDeleteTransaction,
  fetchEditTransaction: transactionActions.fetchEditTransaction
}


export default connect(mapStateToProps, mapActionsToProps)(Transactions);
