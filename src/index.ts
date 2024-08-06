import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotevnv from "dotenv";
import Router from "./v1/router";
import socketController from "./v1/controller/socket/socket.controller";
import socketUsersController from "./v1/controller/socket/socket.users.controller";
import { sendMessageToUser } from "./v1/controller/socket/socketUtils";

dotevnv.config();

const app = express();
const httpServer = createServer(app);
export let io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.set("trust proxy", true);
app.use(express.json());
app.use(cors());
app.use("/api", Router);

io.on("connection", (socket) => {
  socketUsersController.save_session({
    id: socket.id,
    ip: socket.conn.remoteAddress,
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", async (msg) => {
    console.log(socket.id);
    const response = await socketController.request(msg, { id: socket.id });
    if (response) {
      sendMessageToUser(socket.id, { KEY: "STATUS", message: response });
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
