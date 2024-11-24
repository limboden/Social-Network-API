import { Schema, Document, model, ObjectId } from 'mongoose';
import { thoughtSchema } from './Thought.js';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address.']
    },
    thoughts: [thoughtSchema],
    friends: [
      {
        type: this,
        ref: 'friend',
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

// Create a virtual property `friendCount` that gets friend count
userSchema
  .virtual('friendCount')
  // Getter
  .get(function (this: any) {
    return `${this.friends.length}`;
  });


// Initialize our User model
const User = model('user', userSchema);

export default User
