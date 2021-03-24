import { NextFunction, Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import createError from 'http-errors';

import { UserModel } from '../models/user';

const router = Router();

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let errors: any = {};

    const validationErrors = validationResult(req);
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    if (!validationErrors.isEmpty())
      throw next(createError(406, { body: errors }));

    const user = new UserModel({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

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
    body('username')
      .isLength({ min: 3 })
      .withMessage('Min 3 lenght')
      .notEmpty()
      .withMessage('Username empty')
      .custom(async (value: string) => {
        const user = await UserModel.findOne({ username: value });
        if (user) return Promise.reject(`${value} - already exists`);
      }),
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
  createUser
);

export default router;
