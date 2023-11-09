import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema({
    commentText: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide this"]
    },
    commentLike: [{
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        }],
    commentReply: [{
            replyId: {
                type: Schema.Types.ObjectId,
                ref: 'Reply'
            }
        }],
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});
export const commentModel = mongoose.model("Comment", commentSchema);
