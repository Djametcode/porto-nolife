import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema({
    postText: {
        type: String,
    },
    images: [{
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
});
export const postModel = mongoose.model("Post", postSchema);
