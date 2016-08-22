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
      return res.status(500).send(err);
    }

    Transaction.find().sort('-createDate').exec((err, transactions) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({transactions});
    });
  });
}


/**
 * Delete transaction.
 */
export function deleteTransaction(req, res) {
  const {id} = req.params;
  console.log('Delete transaction with ID:', id);
  Transaction.find({_id: id}).remove(err => {
    if (err) {
      return res.status(500).send(err);
    }

    Transaction.find().sort('-createDate').exec((err, transactions) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({transactions});
    });
  });
}


/**
 * Edit transaction.
 */
export function editTransaction(req, res) {
  const {id} = req.params;
  const {transaction} = req.body;
  console.log(`Edit transaction ID:${id} with data: ${transaction}`);

  Transaction.findOneAndUpdate(
    {_id: id},
    transaction,
    {upsert: false}, (err, doc) => {
      if (err) {
        return res.status(500).send(err);
      }

      Transaction.find().sort('-createDate').exec((err, transactions) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json({transactions});
      });
    });
}
