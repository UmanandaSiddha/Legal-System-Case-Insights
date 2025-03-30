import { IChat } from "@/types/type";
import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema<IChat>(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        response: {
            type: String
        },
    }, {
        timestamps: true
    }
);

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
export default Chat;