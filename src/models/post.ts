import { Document, model, ObjectId, Schema } from 'mongoose';

interface Post extends Document {
  title: string;
  thumbnailImage: string;
  description: string;
  descriptionImage: string;
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
    descriptionImage: {
      type: String,
      trim: true,
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
