import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface ILike {
    postId: Types.ObjectId;
    createdBy: Types.ObjectId
}

const likeSchema = new Schema<ILike>({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const likeModel = mongoose.model<ILike>("Like", likeSchema)