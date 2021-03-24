import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { sign } from 'jsonwebtoken';

import { User, UserModel } from '../models/user';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let errors: any = {};

    const adminUser: User = res.locals.user;
    if (!adminUser) errors.admin = 'Please login as admin first';

    if (adminUser.role !== 'admin')
      errors.admin =
        "Unfortunately it's not possible to add members to the database because you're not the admin";

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    const validationErrors = validationResult(req);
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    if (!validationErrors.isEmpty()) throw createError(406, { body: errors });

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password,
    });

    adminUser.createdUsers.push(user.id);
    await adminUser.save();

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    let errors: any = {};

    const validationErrors = validationResult(req);
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    if (!validationErrors.isEmpty()) throw createError(406, { body: errors });

    const user = await UserModel.findOne({ email });
    if (!user) errors.email = `${email} - not exists`;
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    const isPasswordMatched = await compare(password, user!.password);
    if (!isPasswordMatched) errors.password = 'Password not matched';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    const token = sign({ id: user!.id }, 'lol');

    res.set(
      'Set-Cookie',
      serialize('token', token, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      })
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.set(
      'Set-Cookie',
      serialize('token', '', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      })
    );
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const user = (_: Request, res: Response, next: NextFunction) => {
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

export { register, login, logout, user };
