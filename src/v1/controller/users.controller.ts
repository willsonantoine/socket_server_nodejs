import { Request, Response } from "express";
import UsersModel from "../models/users.model";
import { HttpStatus, setResponse } from "../../utils/vars";

const create_user = async (req: Request, res: Response) => {
  try {
    const { token, name } = req.body;
    const exist = await UsersModel.findOne({ where: { token } });
    if (!exist) {
      const result = await UsersModel.create({ name, token });
      setResponse(res, HttpStatus.SUCCESS.message, HttpStatus.SUCCESS.code, {
        id: result.id,
      });
    } else {
      setResponse(
        res,
        `Un utilisateur avec le meme token existe déja dans le system`,
        HttpStatus.CONFLICT.code,
      );
    }
  } catch (error) {
    setResponse(
      res,
      HttpStatus.INSUFFICIENT_STORAGE.message,
      HttpStatus.INTERNAL_SERVER_ERROR.code,
    );
  }
};

export default { create_user };
