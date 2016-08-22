import {Router} from 'express';
import * as TransactionController from '../controllers/transaction.controller';

const router = new Router();

// Get all posts.
router.route('/transactions').get(TransactionController.getTransactions);

// Create new post.
router.route('/transactions').post(TransactionController.createTransaction);


export default router;
