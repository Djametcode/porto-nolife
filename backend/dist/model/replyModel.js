"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
exports.replyModel = mongoose_1.default.model("Reply", replySchema);
