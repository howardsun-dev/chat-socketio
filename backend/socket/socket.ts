import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

export const getReceiverSocketId = receiverId => {
  return userSocketMap(receiverId);
};

const userSocketMap = {}; // {userId: socketId}

io.on('connection', socket => {
  console.log('A user is connected', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != 'undefined') {
    return (userSocketMap(userId) = socket.id);
  }

  // io.emit() is being used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // socket.on() is used to listen to the events, can be used on client and server side
});
