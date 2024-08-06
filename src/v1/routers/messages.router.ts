import express from "express";
import dataValidator, { Val } from "./data.validator";
import messageController from "../controller/message/message.controller";

const MessageRouter = express.Router();

MessageRouter.post(
  "/send_message",
  Val(dataValidator.send_messageValidator),
  messageController.send_message,
);

MessageRouter.post(
  "/send_message_to_user",
  Val(dataValidator.send_message_to_UserValidator),
  messageController.send_message_to_user,
);

export default MessageRouter;
