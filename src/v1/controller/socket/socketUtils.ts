import { io } from "../../..";

export const sendMessageToUser = async (socketId: string, message: any) => {
  if (io) {
    io.to(socketId).emit("private message", message);
  } else {
    console.error("Socket.io server is not initialized.");
  }
};
