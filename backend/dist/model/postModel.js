"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
        ref: 'User'
    }
});
exports.postModel = mongoose_1.default.model("Post", postSchema);
