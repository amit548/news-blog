import { Router } from 'express';
import { body } from 'express-validator';

import { UserModel } from '../models/user';
import { login, logout, register, user } from '../controllers/user';
import auth from '../middlewares/auth';
import notAuth from '../middlewares/not-auth';

const router = Router();

router.post(
  '/register',
  [
    body('firstName')
      .isLength({ min: 3 })
      .withMessage('Min length 3')
      .notEmpty()
      .withMessage('First name empty'),
    body('lastName')
      .isLength({ min: 3 })
      .withMessage('Min length 3')
      .notEmpty()
      .withMessage('Last name empty'),
    body('email')
      .notEmpty()
      .withMessage('Email empty')
      .isEmail()
      .withMessage('Please enter an valid E-mail address')
      .custom(async (value) => {
        const user = await UserModel.findOne({ email: value });
        if (user) return Promise.reject(`${value} - already in use`);
      })
      .normalizeEmail(),
    body('password')
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword)
          throw new Error('Password confirmation is incorrect');
        return true;
      })
      .isLength({ min: 6 })
      .withMessage('Min 6 lenght')
      .notEmpty()
      .withMessage('Password empty'),
  ],
  auth,
  register
);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Email empty')
      .isEmail()
      .withMessage('Please enter an valid E-mail address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Min 6 lenght')
      .notEmpty()
      .withMessage('Password empty'),
  ],
  notAuth,
  login
);

router.delete('/logout', auth, logout);

router.get('/', auth, user);

export default router;
