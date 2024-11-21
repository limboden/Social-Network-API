import { Schema, model, ObjectId, Types } from 'mongoose';

interface IReaction {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Schema to create Post model
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      default: Date.now,
      required: true,
      maxlength: 280,

    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value: Date | undefined) {
        return value ? value.toLocaleString() : ''; // this might be wrong. 
      }
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
    },
    id: false,
  }
);


reactionSchema
  .virtual('getReactions')
  .get(function () {
    return this.responses.length;
  });

// Initialize our Video model
const Reaction = model('reaction', reactionSchema);

export default Reaction;
