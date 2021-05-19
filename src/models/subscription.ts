import { Document, model, Schema } from 'mongoose';

interface Subscription extends Document {
  endpoint: string;
  expirationTime: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

const SubscriptionSchema = new Schema<Subscription>(
  {
    endpoint: { type: String, required: true },
    expirationTime: { type: String, default: null },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const SubscriptionModel = model<Subscription>(
  'Subscription',
  SubscriptionSchema
);

export { Subscription, SubscriptionModel };
