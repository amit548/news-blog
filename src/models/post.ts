import { Document, model, Schema } from 'mongoose';

interface Post extends Document {
  title: string;
  thumbnailImage: string;
  description: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  category: string;
  creator: any;
  private: boolean;
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
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },
    image4: {
      type: String,
    },
    category: {
      type: String,
      enum: ['cat1', 'cat2'],
      default: 'cat1',
      trim: true,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const PostModel = model<Post>('Post', PostSchema);

export { Post, PostModel };
