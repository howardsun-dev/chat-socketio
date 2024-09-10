import Conversations from '../models/conversationModel';
import Message from '../models/messageModel';
import { getReceiverSocketId } from '../socket/socket';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user_id;

        let conversation = await Conversations.findOne({
            participants: { $all: [senderId, receiverId] },
        })
    }
}