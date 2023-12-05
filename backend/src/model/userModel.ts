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

interface INotification {
  notifId: Types.ObjectId;
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  post: IPost[];
  follower: IFollower[];
  following: IFollowing[];
  notification: INotification[]
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
  follower: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  following: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  notification: [{
    notifId: {
      type: Schema.Types.ObjectId,
      ref: "Notif"
    }
  }]
});

export const userModel = mongoose.model<IUser>("User", userSchema);
