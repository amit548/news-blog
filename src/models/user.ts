import { hash } from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
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
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc: any, ret: any) => {
        delete ret.password;
      },
    },
    toJSON: {
      transform: (doc: any, ret: any) => {
        delete ret.password;
      },
    },
  }
);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew || this.isModified) {
      this.password = await hash(this.password, 12);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = model<User>('User', UserSchema);

export { User, UserModel };
