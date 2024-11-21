import { Schema, model, ObjectId, Types } from 'mongoose';
import Response from './Thought.js';

interface IReaction {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Schema to create Post model
const reactionSchema = new Schema<IVideo>(
  {
    reactionId: {
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: String,
      minLength: 8,
      maxLength: 500,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
reactionSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Video model
const Video = model('video', reactionSchema);

export default Video;
