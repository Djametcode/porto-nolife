import mongoose from "mongoose";
const { Schema } = mongoose;
const likeSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
export const likeModel = mongoose.model("Like", likeSchema);
