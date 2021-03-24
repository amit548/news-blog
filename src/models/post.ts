import { Document, model, ObjectId, Schema } from 'mongoose';

interface Post extends Document {
  title: string;
  thumbnail: string;
  description: string;
  image: string;
  creator: any;
}

const PostSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnailImage: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionImage: {
      type: String,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = model<Post>('Post', PostSchema);

export { Post, PostModel };
