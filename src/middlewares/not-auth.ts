import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import createError from 'http-errors';
import { UserModel } from '../models/user';

const notAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    let errors: any = {};

    if (!token) return next();

    const { id }: any = verify(token, 'lol');
    if (!id) return next();

    const user = await UserModel.findById(id);
    if (user) errors.login = 'You already logged in';
    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError' ||
      error.name === 'NotBeforeError'
    )
      next();

    next(error);
  }
};

export default notAuth;
