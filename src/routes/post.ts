import { Router } from 'express';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post';
import auth from '../middlewares/auth';

const router = Router();

router.post('/', auth, createPost);

router.get('/', getPosts);

router.get('/:id', getPost);

router.delete('/:id', auth, deletePost);

router.put('/:id', auth, updatePost);

export default router;
