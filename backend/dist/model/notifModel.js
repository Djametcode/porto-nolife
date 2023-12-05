"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const NotifSchema = new Schema({
    notificationText: {
        type: String,
        required: [true, 'Please provide notification text']
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    notificationFor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.NotifModel = mongoose_1.default.model('Notif', NotifSchema);
