import mongoose from 'mongoose';
import { roles } from '../config/constant';

const pushTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
    },
  },
  {
    collection: 'push_token',
    timestamps: true,
  },
);

const PushToken = mongoose.model('PushToken', pushTokenSchema);

export default PushToken;
