import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import { PostModel } from '../models/post';
import { User, UserModel } from '../models/user';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    thumbnailImage,
    description,
    descriptionImage,
    category,
  } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};

    const validationErrors = validationResult(req);
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    if (!validationErrors.isEmpty()) throw createError(406, { body: errors });

    if (!user) errors.user = 'You are not a creator';

    if (Object.assign(errors).length > 0)
      throw createError(403, { body: errors });

    const post = new PostModel({
      title,
      thumbnailImage,
      description,
      descriptionImage,
      category,
      creator: user.id,
    });
    await post.save();

    user.createdPosts.push(post.id);
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await PostModel.find({}).exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    let errors: any = {};

    if (!isValidObjectId(id)) errors.id = 'Post identification not valid';
    if (Object.keys(errors).length > 0)
      throw createError(400, { body: errors });

    const post = await PostModel.findById(id);

    if (!post) errors.post = 'Post not found';
    if (Object.keys(errors).length > 0)
      throw createError(404, { body: errors });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { id } = req.params;
  const {
    title,
    thumbnailImage,
    description,
    descriptionImage,
    category,
    status,
  } = req.body;

  try {
    let errors: any = {};

    if (!user) errors.user = 'You are not logged in';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    if (!isValidObjectId(id)) errors.id = 'Post identification not valid';
    if (Object.keys(errors).length > 0)
      throw createError(400, { body: errors });

    const post = await PostModel.findById(id);
    if (!post) errors.post = 'Post not found';
    if (Object.keys(errors).length > 0)
      throw createError(404, { body: errors });

    if (post?.creator !== user.id || user.role !== 'admin')
      errors.user = 'You are not owner/admin of this post';
    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    if (title) post!.title = title;
    if (description) post!.description = description;
    if (category) post!.category = category;
    if (status) post!.private = status;
    const updatedPost = await post?.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = res.locals.user;
  const { id } = req.params;

  try {
    let errors: any = {};

    if (!user) errors.user = 'You are not logged in';
    if (Object.keys(errors).length > 0)
      throw createError(401, { body: errors });

    if (!isValidObjectId(id)) errors.id = 'Post identification not valid';
    if (Object.keys(errors).length > 0)
      throw createError(400, { body: errors });

    const post = await PostModel.findById(id);
    if (!post) errors.post = 'Post not found';
    if (Object.keys(errors).length > 0)
      throw createError(404, { body: errors });

    if (post?.creator.toString() !== user.id && user.role !== 'admin')
      errors.user = 'You are not owner/admin of this post';
    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    const creatorUser = await UserModel.findById(post?.creator);

    await post?.remove();
    creatorUser?.createdPosts.pull(id);
    await creatorUser?.save();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export { createPost, getPost, getPosts, updatePost, deletePost };
