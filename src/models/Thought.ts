import { Schema, Document, ObjectId, Types } from 'mongoose';

interface IResponse extends Document {
  thoughtText: string; // must be between 1 and 280 chars
  createdAt: Date;
  username: string;
  reactions: ObjectId[];
}

const throughtSchema = new Schema<IResponse>(
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
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  }
);


throughtSchema
  .virtual('reactionCount')
  .get(function (this: any) {
    return `${this.reactions.length}`;
  });

export default throughtSchema;
