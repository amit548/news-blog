import { hash } from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdUsers?: any;
  createdPosts?: any;
}

const UserSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      trim: true,
      required: true,
    },
    createdUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
    toObject: {
      transform: (_: any, ret: any) => {
        delete ret.password;
      },
    },
    toJSON: {
      transform: (_: any, ret: any) => {
        delete ret.password;
      },
    },
  }
);

UserSchema.pre('save', async function (next) {
  try {
    const firstName = this.firstName.trim();
    const lastName = this.lastName.trim();

    this.firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    this.lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    if (this.isNew) {
      this.password = await hash(this.password, 12);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = model<User>('User', UserSchema);

export { User, UserModel };
