import { Router } from 'express';
import { body } from 'express-validator';

import { UserModel } from '../models/user';
import {
  deleteListUser,
  login,
  logout,
  register,
  singleUser,
  updateListUser,
  userList,
} from '../controllers/user';
import auth from '../middlewares/auth';
import notAuth from '../middlewares/not-auth';

const router = Router();

router.post(
  '/register',
  [
    body('firstName')
      .isLength({ min: 3 })
      .withMessage('First name must be 3 chars long')
      .notEmpty()
      .withMessage('First name is required'),
    body('lastName')
      .isLength({ min: 3 })
      .withMessage('Last name must be 3 chars long')
      .notEmpty()
      .withMessage('Last name is required'),
    body('email')
      .notEmpty()
      .withMessage('E-mail is required')
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
          throw new Error('Password confirmation does not match password');
        return true;
      })
      .isLength({ min: 6 })
      .withMessage('The password must be 6+ chars long')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  auth,
  register
);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('E-mail is required')
      .isEmail()
      .withMessage('Please enter an valid E-mail address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('The password must be 6+ chars long')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  notAuth,
  login
);

router.post('/logout', auth, logout);

router.get('/list', auth, userList);

router.get('/list/:id', auth, singleUser);

router.delete('/list/:id', auth, deleteListUser);

router.put(
  '/list/:id',
  [
    body('firstName')
      .isLength({ min: 3 })
      .withMessage('First name must be 3 chars long')
      .notEmpty()
      .withMessage('First name is required')
      .optional({ nullable: true, checkFalsy: true }),
    body('lastName')
      .isLength({ min: 3 })
      .withMessage('Last name must be 3 chars long')
      .notEmpty()
      .withMessage('Last name is required')
      .optional({ nullable: true, checkFalsy: true }),
    body('email')
      .notEmpty()
      .withMessage('E-mail is required')
      .isEmail()
      .withMessage('Please enter an valid E-mail address')
      .custom(async (value, { req }) => {
        const user = await UserModel.findById((req.params as any).id);
        const emailUser = await UserModel.findOne({ email: value });

        if (emailUser?.id !== user?.id && emailUser)
          return Promise.reject(`${value} - already in use`);
      })
      .normalizeEmail()
      .optional({ nullable: true, checkFalsy: true }),
    body('password')
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword)
          throw new Error('Password confirmation does not match password');
        return true;
      })
      .isLength({ min: 6 })
      .withMessage('The password must be 6+ chars long')
      .notEmpty()
      .withMessage('Password is required')
      .optional({ nullable: true, checkFalsy: true }),
  ],
  auth,
  updateListUser
);

export default router;
