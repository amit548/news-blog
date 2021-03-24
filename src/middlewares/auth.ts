import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { verify } from 'jsonwebtoken';

import { UserModel } from '../models/user';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    let errors: any = {};

    if (!token) errors.token = 'Token not found, please relogin';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    const decodedToken = verify(token, 'lol');
    if (!decodedToken) errors.token = 'Access token invalid, please relogin';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    const { id }: any = decodedToken;
    const user = await UserModel.findById(id);
    if (!user) errors.user = 'User not found';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    res.locals.user = user;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError')
      error = createError(401, {
        body: { token: 'Access token invalid, please relogin' },
      });
    if (error.name === 'TokenExpiredError')
      error = createError(401, {
        body: { token: 'Access token expired, please relogin' },
      });
    if (error.name === 'NotBeforeError')
      error = createError(401, {
        body: { token: 'Token not active, please relogin' },
      });

    next(error);
  }
};

export default auth;
