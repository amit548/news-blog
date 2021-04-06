import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { join } from 'path';

import { PostModel } from '../models/post';
import { User, UserModel } from '../models/user';
import { deleteFile, makeId } from '../utils/util';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, category } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};

    const validationErrors = validationResult(req);
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    if (!validationErrors.isEmpty()) throw createError(406, { body: errors });

    if (!user) errors.user = 'You are not a creator';

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    const newPost: any = {
      title,
      thumbnailImage: '',
      description,
      category,
      creator: user.id,
    };

    if (req.files) {
      if ((req.files as any).thumbnailImage) {
        if (
          (req.files as any).thumbnailImage.mimetype === 'image/jpeg' ||
          (req.files as any).thumbnailImage.mimetype === 'image/png'
        ) {
          const fileName =
            makeId(8) + '-' + (req.files as any).thumbnailImage.name;
          newPost.thumbnailImage = fileName;
          (req.files as any).thumbnailImage.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.thumbnailImage = 'Only jpeg, jpg & png accepted';
        }
      } else {
        errors.thumbnailImage = 'Thumbnail image required';
      }
    }

    if (req.files) {
      if ((req.files as any).image1) {
        if (
          (req.files as any).image1.mimetype === 'image/jpeg' ||
          (req.files as any).image1.mimetype === 'image/png'
        ) {
          const fileName = makeId(8) + '-' + (req.files as any).image1.name;
          newPost.image1 = fileName;
          (req.files as any).image1.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image1 = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image2) {
        if (
          (req.files as any).image2.mimetype === 'image/jpeg' ||
          (req.files as any).image2.mimetype === 'image/png'
        ) {
          const fileName = makeId(8) + '-' + (req.files as any).image2.name;
          newPost.image2 = fileName;
          (req.files as any).image2.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image2 = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image3) {
        if (
          (req.files as any).image3.mimetype === 'image/jpeg' ||
          (req.files as any).image3.mimetype === 'image/png'
        ) {
          const fileName = makeId(8) + '-' + (req.files as any).image3.name;
          newPost.image3 = fileName;
          (req.files as any).image3.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image3 = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image4) {
        if (
          (req.files as any).image4.mimetype === 'image/jpeg' ||
          (req.files as any).image4.mimetype === 'image/png'
        ) {
          const fileName = makeId(8) + '-' + (req.files as any).image4.name;
          newPost.image4 = fileName;
          (req.files as any).image4.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image4 = 'Only jpeg, jpg & png accepted';
        }
      }
    }

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    const post = new PostModel({ ...newPost });
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
  const { title, description, category, status } = req.body;

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

    if (post?.creator !== user.id && user.role !== 'admin')
      errors.user = 'You are not owner/admin of this post';
    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    if (title) post!.title = title;
    if (description) post!.description = description;
    if (category) post!.category = category;
    if (status) post!.private = status;
    if (req.files) {
      if ((req.files as any).thumbnailImage) {
        if (
          (req.files as any).thumbnailImage.mimetype === 'image/jpeg' ||
          (req.files as any).thumbnailImage.mimetype === 'image/png'
        ) {
          await deleteFile(post!.thumbnailImage);
          const fileName =
            makeId(8) + '-' + (req.files as any).thumbnailImage.name;
          post!.thumbnailImage = fileName;
          (req.files as any).thumbnailImage.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.thumbnailImage = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image1) {
        if (
          (req.files as any).image1.mimetype === 'image/jpeg' ||
          (req.files as any).image1.mimetype === 'image/png'
        ) {
          if (post!.image1) {
            await deleteFile(post!.image1);
          }
          const fileName = makeId(8) + '-' + (req.files as any).image1.name;
          post!.image1 = fileName;
          (req.files as any).image1.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image1 = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image2) {
        if (
          (req.files as any).image2.mimetype === 'image/jpeg' ||
          (req.files as any).image2.mimetype === 'image/png'
        ) {
          if (post!.image2) {
            await deleteFile(post!.image2);
          }
          const fileName = makeId(8) + '-' + (req.files as any).image2.name;
          post!.image2 = fileName;
          (req.files as any).image2.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image2 = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image3) {
        if (
          (req.files as any).image3.mimetype === 'image/jpeg' ||
          (req.files as any).image3.mimetype === 'image/png'
        ) {
          if (post!.image3) {
            await deleteFile(post!.image3);
          }
          const fileName = makeId(8) + '-' + (req.files as any).image3.name;
          post!.image3 = fileName;
          (req.files as any).image3.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image3 = 'Only jpeg, jpg & png accepted';
        }
      }

      if ((req.files as any).image4) {
        if (
          (req.files as any).image4.mimetype === 'image/jpeg' ||
          (req.files as any).image4.mimetype === 'image/png'
        ) {
          if (post!.image4) {
            await deleteFile(post!.image4);
          }
          const fileName = makeId(8) + '-' + (req.files as any).image4.name;
          post!.image4 = fileName;
          (req.files as any).image4.mv(
            join(__dirname, '../../public/images/' + fileName)
          );
        } else {
          errors.image4 = 'Only jpeg, jpg & png accepted';
        }
      }
    }

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

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
    if (post?.thumbnailImage) await deleteFile(post?.thumbnailImage);
    if (post?.image1) await deleteFile(post?.image1);
    if (post?.image2) await deleteFile(post?.image2);
    if (post?.image3) await deleteFile(post?.image3);
    if (post?.image4) await deleteFile(post?.image4);
    creatorUser?.createdPosts.pull(id);
    await creatorUser?.save();

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export { createPost, getPost, getPosts, updatePost, deletePost };
