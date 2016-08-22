import {Router} from 'express';

const router = new Router();

let mockPosts = ['One', 'Two', 'Three'];

router.route('/todos').get((req, res, next) => {
  return res.json(mockPosts);
});


export default router;
