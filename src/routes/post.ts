import { Router } from 'express';
import { body } from 'express-validator';

import {
  createPost,
  createSubscription,
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

import push from 'web-push';

router.post('/test', async (req, res) => {
  try {
    const publicKey =
      'BHbFY4Ta6Ju1J3AcjzSy6pbYSxInb9rogHSvXsQ3pGS4CJluYEC1sbkJhAdT3kZPx07mdQoLdDy3j5ZWgqN69kQ';
    const privateKey = 'hKmfCJ3OrkhhwDBKJgfcDb2L0Wznv6dfOg_FPWHUAQc';

    push.setVapidDetails('mailto:rakeshwbp@gmail.com', publicKey, privateKey);

    const notificationPayload = JSON.stringify({
      title: 'lol',
      img: `https://kormerkhoj.com/post/609ba9345a0ca0261d6717b5`,
    });

    const sub = {
      endpoint:
        'https://fcm.googleapis.com/fcm/send/fQAAhXkFTMI:APA91bF9I6hQAvo6jb7U0xQ_oS7VUo2D0KQIsoY9wd9zAEylWehCJ7lPhRoP0qw_QY_GMtf74rqHNPrV-65tBRV-InekfVDFGTO3iNQRxCEYoriMAuA7B1YXWXC-jFEmXNMrHi7MyuxR',
      expirationTime: null,
      keys: {
        p256dh:
          'BNb_qAkPhdMrnAaVD6i5eWUNIt7WmRL5k_mLsRj2hXh1pLxfbz9KT_TTSRjk9eIhuTRL_9yoxpfF4PKy5NuJ-rA',
        auth: 'qZheGOzz76k2R-QD6fUg8Q',
      },
    };

    await push.sendNotification(sub, notificationPayload);

    res.status(201).json({});
  } catch (error) {
    res.json(error);
  }

  res.status(201).json({});
});

router.post('/subscribe', createSubscription);

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
