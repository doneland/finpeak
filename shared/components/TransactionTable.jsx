import React from 'react';


export default class TransactionTable extends React.Component {

  render() {
    const {transactions} = this.props;
    const rows = transactions.map((trsx, index) => {
      console.log('Index:', index);
      return <tr key={index}>
        <td>{trsx.type}</td>
        <td>{trsx.category}</td>
        <td>{trsx.amount}</td>
        <td>{trsx.createDate}</td>
        <td><small>{trsx.comment}</small></td>
      </tr>
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
