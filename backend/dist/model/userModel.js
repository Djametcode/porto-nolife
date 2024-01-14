"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    post: [
        {
            postId: {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        },
    ],
    follower: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }],
    following: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }],
    notification: [{
            notifId: {
                type: Schema.Types.ObjectId,
                ref: "Notif"
            }
        }]
});
exports.userModel = mongoose_1.default.model("User", userSchema);
