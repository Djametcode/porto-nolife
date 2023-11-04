import mongoose, { Types } from "mongoose";
const { Schema } = mongoose


interface CommentReply {
    replyId: Types.ObjectId
}

interface CommetLike {
    createdBy: Types.ObjectId;
}

interface IComment {
    commentText: string;
    createdBy: Types.ObjectId;
    commentLike: CommetLike[];
    commentReply: CommentReply[];
    postId: Types.ObjectId

}

const commentSchema = new Schema<IComment>({
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
})

export const commentModel = mongoose.model<IComment>("Comment", commentSchema)