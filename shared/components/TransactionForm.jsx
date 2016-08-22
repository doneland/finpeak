import React from 'react';


export default class TransactionForm extends React.Component {

  constructor(props) {
    super(props);

    this.emptyForm = {
      type: '',
      category: '',
      amount: '',
      comment: ''
    };

    this.state = {
      form: this.emptyForm
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  resetForm() {
    this.setState({form: emptyForm});
  }


  handleSubmit(e) {
    e.preventDefault();
    const {onSubmit} = this.props;
    const {form} = this.state;

    onSubmit(form);

    return this.resetForm();
  }


  handleChange(e, field) {
    e.preventDefault();
    const {form} = this.state;
    const nextForm = Object.assign({}, form, {[field]: e.target.value});
    this.setState({form: nextForm});
   }

  render() {
    const {form} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          value={form.type}
          onChange={(e) => this.handleChange(e, 'type')}/>
        <br />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={form.category}
          onChange={(e) => this.handleChange(e, 'category')} />
        <br />

        <label htmlFor="comment">Amount</label>
        <input
          type="number"
          id="amount"
          value={form.amount}
          onChange={(e) => this.handleChange(e, 'amount')} />
        <br />

        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={form.comment}
          onChange={(e) => this.handleChange(e, 'comment')} >
        </textarea>
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}
