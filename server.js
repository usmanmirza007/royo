import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server as socket } from "socket.io";
import dotenv from "dotenv";
import twilio from "twilio";
import TrainerRouter from "./server/router/SignupRouter/TrainerRouter.js";
import message from "./server/router/MessageRouter.js";
import country from "./server/router/country/Country.js";
import state from "./server/router/state/State.js";
import district from "./server/router/District/District.js";
import city from "./server/router/City.js";
import area from "./server/router/AreaRouter.js";
import callRoutes from "./server/router/CallRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Twilio Client Initialization
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

export const twilioClient = twilio(twilioAccountSID, twilioAuthToken);

mongoose
  .connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/signup", TrainerRouter);
app.use("/message", message);
app.use("/country", country);
app.use("/state", state);
app.use("/district", district);
app.use("/city", city);
app.use("/area", area);
app.use("/calls", callRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = new socket(server, {
  cors: {
    origin: "http://16.171.43.168",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log("userId", userId);
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("data", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
