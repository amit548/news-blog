import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { join } from 'path';
import push from 'web-push';

import { PostModel } from '../models/post';
import { Subscription, SubscriptionModel } from '../models/subscription';
import { User, UserModel } from '../models/user';
import { deleteFile, makeId } from '../utils/util';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  let {
    title,
    description,
    category,
    private: isPrivate,
    videoUrl,
    trending,
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

    if (Object.keys(errors).length > 0)
      throw createError(403, { body: errors });

    if (user.role === 'user') isPrivate = true;
    if (user.role === 'user') trending = false;

    const newPost: any = {
      title,
      description,
      category,
      creator: user.id,
      private: isPrivate,
      videoUrl,
      trending,
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
    } else {
      errors.thumbnailImage = 'Thumbnail image required';
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

    if (!post.private) {
      try {
        const publicKey =
          'BHbFY4Ta6Ju1J3AcjzSy6pbYSxInb9rogHSvXsQ3pGS4CJluYEC1sbkJhAdT3kZPx07mdQoLdDy3j5ZWgqN69kQ';
        const privateKey = 'hKmfCJ3OrkhhwDBKJgfcDb2L0Wznv6dfOg_FPWHUAQc';

        push.setVapidDetails(
          'mailto:rakeshwbp@gmail.com',
          publicKey,
          privateKey
        );

        const notificationPayload = JSON.stringify({
          _id: post._id,
          title: post.title,
          img: `http://kormerkhoj.com/api/public/images/${post.thumbnailImage}`,
        });

        (await SubscriptionModel.find().exec()).forEach(async (sub) => {
          await push.sendNotification(sub, notificationPayload);
        });
      } catch (_) {}
    }

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const createSubscription = async (req: Request, res: Response) => {
  const subscription: Subscription = req.body;

  try {
    if (subscription) {
      const oldSubs = await SubscriptionModel.findOne({
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.keys.auth,
          p256dh: subscription.keys.p256dh,
        },
      });
      if (!oldSubs) {
        const newSubscription = new SubscriptionModel({ ...subscription });
        await newSubscription.save();
      }
    }
  } catch (error) {}

  res.status(201).json({});
};

const getPosts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await PostModel.find({ private: false })
      .sort({ createdAt: -1 })
      .populate('creator')
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = (req.query as any).category || 'সরকারি চাকরি';
    const postsPerPage = parseInt((req.query as any).limit) || 6;
    const currentPage = parseInt((req.query as any).page) || 1;

    const totalPosts = await PostModel.find({
      private: false,
      category,
    }).countDocuments();

    const posts = await PostModel.find({
      private: false,
      category,
    })
      .skip((currentPage - 1) * postsPerPage)
      .limit(postsPerPage)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ totalPosts, posts });
  } catch (error) {
    next(error);
  }
};

const getPostsForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;
  const currentPage = parseInt((req.query as any).page) || 1;
  const postsPerPage = parseInt((req.query as any).limit) || 30;

  try {
    let adminConfig: any = {};

    if (user.role !== 'admin') {
      adminConfig.creator = user.id;
    }

    const postsDocCount = await PostModel.find(adminConfig).countDocuments();

    const posts = await PostModel.find(adminConfig)
      .skip((currentPage - 1) * postsPerPage)
      .limit(postsPerPage)
      .sort({ createdAt: -1 })
      .populate('creator')
      .exec();
    res.status(200).json({ totalPosts: postsDocCount, posts });
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
    description,
    category,
    private: isPrivate,
    videoUrl,
    trending,
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

    if (post?.creator.toString() !== user.id && user.role !== 'admin')
      errors.user = 'You are not owner/admin of this post';
    if (Object.keys(errors).length > 0)
      throw createError(406, { body: errors });

    if (title) post!.title = title;
    if (description) post!.description = description;
    if (category) post!.category = category;
    if (user.role === 'admin') {
      if (isPrivate) post!.private = isPrivate;
      if (trending) post!.trending = trending;
    }
    if (videoUrl || videoUrl === '') post!.videoUrl = videoUrl;
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

    if (!updatedPost?.private) {
      try {
        const publicKey =
          'BHbFY4Ta6Ju1J3AcjzSy6pbYSxInb9rogHSvXsQ3pGS4CJluYEC1sbkJhAdT3kZPx07mdQoLdDy3j5ZWgqN69kQ';
        const privateKey = 'hKmfCJ3OrkhhwDBKJgfcDb2L0Wznv6dfOg_FPWHUAQc';

        push.setVapidDetails(
          'mailto:rakeshwbp@gmail.com',
          publicKey,
          privateKey
        );

        const notificationPayload = JSON.stringify({
          _id: updatedPost?._id,
          title: updatedPost?.title,
          img: `http://kormerkhoj.com/api/public/images/${updatedPost?.thumbnailImage}`,
        });

        (await SubscriptionModel.find().exec()).forEach(async (sub) => {
          await push.sendNotification(sub, notificationPayload);
        });
      } catch (_) {}
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deleteImageFormPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName } = req.params;

  try {
    const post1 = await PostModel.findOne({ image1: fileName });
    const post2 = await PostModel.findOne({ image2: fileName });
    const post3 = await PostModel.findOne({ image3: fileName });
    const post4 = await PostModel.findOne({ image4: fileName });

    if (post1) {
      post1.image1 = undefined;
      await post1.save();
    }

    if (post2) {
      post2.image1 = undefined;
      await post2.save();
    }

    if (post3) {
      post3.image1 = undefined;
      await post3.save();
    }

    if (post4) {
      post4.image1 = undefined;
      await post4.save();
    }

    await deleteFile(fileName);
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

const getVideoList = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await PostModel.find({
      private: false,
      videoUrl: { $exists: true, $ne: '' },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    const videoExistsPosts = posts
      .map((post) => ({
        _id: post.id,
        videoUrl: post.videoUrl,
        title: post.title,
      }))
      .filter((vdo) => vdo.videoUrl !== '');

    res.status(200).json(videoExistsPosts);
  } catch (error) {
    next(error);
  }
};

const getTrendingPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentPage = parseInt((req.query as any).page) || 1;
  const postsPerPage = parseInt((req.query as any).limit) || 10;

  try {
    const posts = await PostModel.find({
      private: false,
      trending: true,
    })
      .skip((currentPage - 1) * postsPerPage)
      .limit(postsPerPage)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsForAdmin,
  getPostsByCategory,
  deleteImageFormPost,
  getVideoList,
  getTrendingPosts,
  createSubscription,
};
