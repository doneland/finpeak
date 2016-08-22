import {Router} from 'express';
import * as TransactionController from '../controllers/transaction.controller';

const router = new Router();

// Get all transactions.
router.route('/transactions').get(TransactionController.getTransactions);

// Create new transactions.
router.route('/transactions').post(TransactionController.createTransaction);

// Edit transaction by ID provided in the route.
router.route('/transactions/:id').put(TransactionController.editTransaction);

// Delete transaction by provided ID.
router.route('/transactions/:id').delete(TransactionController.deleteTransaction);

export default router;
