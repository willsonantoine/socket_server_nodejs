import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import vars, { HttpStatus } from "../../utils/vars";

const ValidateFields = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error: any) => `${error.path}: ${error.msg}`)
      .join(", ");
    vars.setResponse(
      res,
      `${errorMessages}`,
      HttpStatus.UNPROCESSABLE_ENTITY.code,
      req.body,
    );
  } else {
    next();
  }
};

const createUserValidator = [
  body("name").notEmpty().withMessage("name cannot be empty"),
  body("token").notEmpty().withMessage("token cannot be empty"),
];

const send_messageValidator = [
  body("message").notEmpty().withMessage("message cannot be empty"),
  body("token").notEmpty().withMessage("token cannot be empty"),
];

const send_message_to_UserValidator = [
  body("message").notEmpty().withMessage("message cannot be empty"),
  body("token_from").notEmpty().withMessage("token cannot be empty"),
  body("token_to").notEmpty().withMessage("token cannot be empty"),
];

export const Val = (TabValidator: any) => [TabValidator, ValidateFields];

export default {
  createUserValidator,
  send_messageValidator,
  send_message_to_UserValidator,
};
