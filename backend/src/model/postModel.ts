import { timeStamp } from "console";
import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface ILike {
    likeId: Types.ObjectId
}

interface IComment {
    commentId: Types.ObjectId
}

interface Image {
    _id: Types.ObjectId;
    imageUrl: string;
}

interface IPost {
    postText: string;
    images: Image[],
    like: ILike[],
    comment: IComment[],
    createdBy: Types.ObjectId,
    createdDate: Date
}

const postSchema = new Schema<IPost>({
    postText: {
        type: String,
    },
    images: [{
        _id: {
            type: Schema.Types.ObjectId
        },
        imageUrl: {
            type: String,
        }
    }],
    like: [{
        likeId: {
            type: Schema.Types.ObjectId,
            ref: 'Like'
        }
    }],
    comment: [{
        commentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

export const postModel = mongoose.model<IPost>("Post", postSchema)