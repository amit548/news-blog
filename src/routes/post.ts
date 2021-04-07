import { Router } from 'express';
import { body } from 'express-validator';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
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
      .withMessage('Title is empty'),
    body('description')
      .isLength({ min: 6 })
      .withMessage('Description must be 20 char long')
      .notEmpty()
      .withMessage('Description is empty'),
    body('category').notEmpty().withMessage('Category is empty'),
  ],
  auth,
  createPost
);

router.get('/', getPosts);

router.get('/:id', getPost);

router.delete('/:id', auth, deletePost);

router.put('/:id', auth, updatePost);

export default router;
