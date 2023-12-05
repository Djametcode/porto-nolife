import mongoose, { Types } from "mongoose";
const { Schema } = mongoose

interface INotification {
    notificationText: string;
    isRead: boolean;
    createdAt: Date;
    notificationFor: Types.ObjectId;
    createdBy: Types.ObjectId
}

const NotifSchema = new Schema<INotification>({
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
})

export const NotifModel = mongoose.model('Notif', NotifSchema)