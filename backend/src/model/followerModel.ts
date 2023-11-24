import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

interface Follower {
  userId: Types.ObjectId;
  following: Types.ObjectId;
}

const followerSchema = new Schema<Follower>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const followerModel = mongoose.model("Follower", followerSchema);
