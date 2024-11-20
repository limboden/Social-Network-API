import { Schema, Document, model, ObjectId } from 'mongoose';

interface IUser extends Document {
  first: string;
  last: string;
  throughts: ObjectId[];
  friends: ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
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
