import express from "express";
import V1Router from "./routers/v1.router";

const Router = express.Router();

Router.use("/v1", V1Router);

export default Router;
