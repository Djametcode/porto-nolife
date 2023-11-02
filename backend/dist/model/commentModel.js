"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
