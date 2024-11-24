import { Schema, Document, ObjectId, model } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
  thoughtText: string; // must be between 1 and 280 chars
  createdAt: Date;
  username: string;
  reactions: ObjectId[];
  getCreatedAt(): Date;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


thoughtSchema.methods.getCreatedAt = function (): Date {
  return this.createdAt;
}

thoughtSchema
  .virtual('reactionCount')
  .get(function (this: any) {
    return this.reactions.length;
  });


const Thought = model('user', thoughtSchema);
export { Thought, thoughtSchema }
