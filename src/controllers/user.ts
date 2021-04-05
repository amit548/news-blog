import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { sign } from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';

import { User, UserModel } from '../models/user';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let errors: any = {};

    const adminUser: User = res.locals.user;
    if (!adminUser) errors.admin = 'Please login as admin first';

    if (adminUser.role !== 'admin' || !adminUser.role)
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

const userList = async (_: Request, res: Response, next: NextFunction) => {
  const adminUser = res.locals.user;

  try {
    let errors: any = {};

    if (!adminUser) errors.admin = 'Please login as admin first';

    if (adminUser.role !== 'admin')
      errors.admin =
        "Unfortunately it's not possible to show all members because you're not the admin";

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    const users = await UserModel.find({ role: 'user' }).exec();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteListUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminUser: User = res.locals.user;

  try {
    let errors: any = {};

    if (!adminUser) errors.admin = 'Please login as admin first';

    if (adminUser.role !== 'admin')
      errors.admin =
        "Unfortunately it's not possible to delete any members because you're not the admin";

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    const { id } = req.params;
    if (!isValidObjectId(id)) errors.id = 'User ID not valid';

    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    if (adminUser.id.toString() === id)
      errors.admin = 'Self delete not possible';
    if (Object.keys(errors).length > 0)
      throw createError(405, { body: errors });

    const currentUser = await UserModel.findById(id);
    if (!currentUser) errors.user = 'User not found';

    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    await currentUser?.remove();

    adminUser.createdUsers = adminUser.createdUsers.pull(id);
    await adminUser.save();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const updateListUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminUser: User = res.locals.user;
  const { firstName, lastName, email, password } = req.body;

  try {
    let errors: any = {};

    if (!adminUser) errors.admin = 'Please login as admin first';

    if (adminUser.role !== 'admin')
      errors.admin =
        "Unfortunately it's not possible to update any members because you're not the admin";

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    const { id } = req.params;
    if (!isValidObjectId(id)) errors.id = 'User ID not valid';

    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    const validationErrors = validationResult(req);
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    if (!validationErrors.isEmpty()) throw createError(406, { body: errors });

    const updateUser = await UserModel.findById(id);
    if (!updateUser) errors.user = 'User not found';

    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    if (firstName) updateUser!.firstName = firstName;
    if (lastName) updateUser!.lastName = lastName;
    if (email) updateUser!.email = email;
    if (password) updateUser!.password = password;
    const updatedUserData = await updateUser?.save();

    res.status(201).json(updatedUserData);
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, userList, deleteListUser, updateListUser };
