import {Router} from 'express';

const router = new Router();

let mockPosts = ['One', 'Two', 'Three'];

router.route('/todos').get((req, res, next) => {
  console.log('Mock posts:', mockPosts);
  return res.json(mockPosts);
});


export default router;
