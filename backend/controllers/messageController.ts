import { nextTick } from 'process';
import Conversations from '../models/conversationModel';
import Message from '../models/messageModel';
import { getReceiverSocketId } from '../socket/socket';
import express, { Express, Request, Response, NextFunction } from 'express';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversations.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversations.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    return next();
  } catch (error) {
    return next({
      log: `Error in the messageController.sendMessage: ${error}`,
      status: 500,
      message: {
        err: `Unable to send message, check logs for more details.`,
      },
    });
  }
};
