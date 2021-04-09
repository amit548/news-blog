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
  videoUrl: string;
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
    videoUrl: {
      type: String,
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
      enum: [
        'সরকারি চাকরি',
        'বেসরকারি চাকরি',
        'পরীক্ষার সিলেবাস',
        'রেজাল্ট',
        'নোটিশ',
      ],
      default: 'সরকারি চাকরি',
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
