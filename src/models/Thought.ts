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
      get: function (value: Date | undefined) {
        return value ? value.toLocaleString() : ''; // this might be wrong. 
      }

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


throughtSchema
  .virtual('reactionCount')
  .get(function (this: any) {
    return `${this.reactions.length}`;
  });

export default throughtSchema;
