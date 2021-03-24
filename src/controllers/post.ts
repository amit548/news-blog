import { Request, Response, NextFunction } from 'express';

const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {};

const getPost = async (req: Request, res: Response, next: NextFunction) => {};

const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { createPost, getPost, getPosts, updatePost, deletePost };
