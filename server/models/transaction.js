import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
  type: {type: String, required: true},
  category: {type: String, required: true},
  amount: {type: Number, required: true},
  comment: {type: String},
  createDate: {type: 'Date', default: Date.now, required: true}
});


export default mongoose.model('Transaction', transactionSchema);
