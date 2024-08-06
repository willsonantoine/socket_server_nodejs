import { Request, Response } from "express";
import UsersModel from "../../models/users.model";
import { HttpStatus, setResponse } from "../../../utils/vars";
import { sendMessageToUser } from "../socket/socketUtils";
import ChatModel from "../../models/chat.model";

const send_message = async (req: Request, res: Response) => {
  try {
    const { token, message } = req.body;
    const user = await UsersModel.findOne({ where: { token } });
    if (user) {
      const result = await sendMessageToUser(user.sessionId, message);
      await ChatModel.create({ UserIdTo: user.id, message: message.message });
      setResponse(
        res,
        HttpStatus.SUCCESS.message,
        HttpStatus.SUCCESS.code,
        result,
      );
    } else {
      setResponse(
        res,
        `Cet utilisateur n'exite pas dans le system`,
        HttpStatus.CONFLICT.code,
      );
    }
  } catch (error) {
    setResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR.message,
      HttpStatus.INTERNAL_SERVER_ERROR.code,
      null,
      error,
    );
  }
};
const send_message_to_user = async (req: Request, res: Response) => {
  try {
    const { token_from, token_to, message } = req.body;
    const user_from = await UsersModel.findOne({
      where: { token: token_from },
    });
    const user_to = await UsersModel.findOne({ where: { token: token_to } });

    if (user_from && user_to) {
      await ChatModel.create({
        UserIdTo: user_to.id,
        UserIdFrom: user_from.id,
        message: message.message,
      });
      const result = await sendMessageToUser(user_to.sessionId, message);

      setResponse(
        res,
        HttpStatus.SUCCESS.message,
        HttpStatus.SUCCESS.code,
        result,
      );
    } else {
      setResponse(
        res,
        `Cet utilisateur n'exite pas dans le system`,
        HttpStatus.CONFLICT.code,
      );
    }
  } catch (error) {
    setResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR.message,
      HttpStatus.INTERNAL_SERVER_ERROR.code,
      null,
      error,
    );
  }
};

export default { send_message, send_message_to_user };
