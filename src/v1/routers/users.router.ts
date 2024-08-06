import express from "express";
import usersController from "../controller/users.controller";
import dataValidator, { Val } from "./data.validator";

const UserRouter = express.Router();

UserRouter.post(
  "/create",
  Val(dataValidator.createUserValidator),
  usersController.create_user,
);

export default UserRouter;
