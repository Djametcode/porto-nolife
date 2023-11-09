import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide username"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6
    },
    avatar: {
        type: String,
        default: ""
    },
    post: [{
            postId: {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        }]
});
export const userModel = mongoose.model("User", userSchema);
