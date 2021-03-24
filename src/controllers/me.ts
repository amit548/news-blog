import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const me = (_: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;

  try {
    let errors: any = {};

    if (!user) errors.user = 'User not found';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default me;
