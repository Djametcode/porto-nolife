import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface ILike {
    createdBy: Types.ObjectId
}

interface IReply {
    commentId: Types.ObjectId;
    replyText: string;
    createdBy: Types.ObjectId
    replyLike: ILike[]
}

const replySchema = new Schema<IReply>({
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
})

export const replyModel = mongoose.model("Reply", replySchema)