import mongoose from "mongoose";
const { Schema } = mongoose;
const replySchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    replyText: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replyLike: [{
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }]
});
export const replyModel = mongoose.model("Reply", replySchema);
