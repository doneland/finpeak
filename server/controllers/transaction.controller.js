import Transaction from '../models/transaction';


/**
 * Get all transactions.
 */
export function getTransactions(req, res) {
  Transaction.find().sort('-createDate').exec((err, transactions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({transactions});
  });
}


/**
 * Create new transaction.
 */
export function createTransaction(req, res) {
  if (!req.body.transaction.type || !req.body.transaction.category || !req.body.transaction.amount) {
    res.status(403).end();
  }

  const trsx = new Transaction(req.body.transaction);

  trsx.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({tansaction: saved});
  });
}
