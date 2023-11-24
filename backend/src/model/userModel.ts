import mongoose, { Document, Types } from "mongoose";
const { Schema } = mongoose;

interface IFollower {
  userId: Types.ObjectId;
}

interface IFollowing {
  userId: Types.ObjectId;
}

interface IPost {
  postId: Types.ObjectId;
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  post: IPost[];
  follower: IFollower[];
  following: IFollowing[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  avatar: {
    type: String,
    default: "",
  },
  post: [
    {
      postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
  follower: [],
  following: [],
});

export const userModel = mongoose.model<IUser>("User", userSchema);
