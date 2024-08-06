import express from "express";
import UserRouter from "./users.router";
import MessageRouter from "./messages.router";

const V1Router = express.Router();

V1Router.use("/users", UserRouter);
V1Router.use("/messages", MessageRouter);

export default V1Router;
