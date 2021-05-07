import { Router } from 'express';
import { body } from 'express-validator';

import {
  createPost,
  deleteImageFormPost,
  deletePost,
  getPost,
  getPosts,
  getPostsByCategory,
  getPostsForAdmin,
  getTrendingPosts,
  getVideoList,
  updatePost,
} from '../controllers/post';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/',
  [
    body('title')
      .isLength({ min: 6 })
      .withMessage('Title must be 6 char long')
      .notEmpty()
      .withMessage('Title is required'),
    body('description')
      .isLength({ min: 6 })
      .withMessage('Description must be 20 char long')
      .notEmpty()
      .withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  auth,
  createPost
);

router.get('/', getPosts);

router.get('/video', getVideoList);

router.get('/news', getPostsByCategory);

router.get('/trending_news', getTrendingPosts);

router.get('/admin', auth, getPostsForAdmin);

router.get('/:id', getPost);

router.delete('/:id', auth, deletePost);

router.delete('/del/:fileName', auth, deleteImageFormPost);

router.put(
  '/:id',
  [
    body('title')
      .isLength({ min: 6 })
      .withMessage('Title must be 6 char long')
      .notEmpty()
      .withMessage('Title is required'),
    body('description')
      .isLength({ min: 6 })
      .withMessage('Description must be 20 char long')
      .notEmpty()
      .withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  auth,
  updatePost
);

export default router;
