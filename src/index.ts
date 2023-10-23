//@ts-nocheck

process.env.NODE_ENV === "dev"
  ? require("dotenv").config({ path: "./env/dev.env" })
  : require("dotenv").config({ path: "./env/prod.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const postgresDb = require("./Model/postgres.index");
const mongoDb = require("./Model/mongo.index");

const app = express();

const { Server } = require("socket.io");

const socketServer = require("http").createServer(handler);
const io = new Server(socketServer);
function handler(req, res) {
  res.writeHead(200).end({});
}
io.on("connection", (socket) => {
  socket.on("private message", (anotherSocketId, msg) => {
    console.log(anotherSocketId);
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });
});
socketServer.listen(7002, (err) => {
  if (err) {
    console.log(`Unable to run Server on ${7002}=> ${err}`);
  } else {
    console.log(`Server Up: ${7002}`);
  }
});

// const io = require("socket.io")(server, {
//   cors: {
//     origin: [process.env.PROXY_SERVER_URL],
//   },
// });

const PORT = process.env.PORT || 5002;

import { API_BASE_URL_TYPE } from "./utils/constant/DATA_TYPES";

app.use(
  cors({
    origin: [process.env.PROXY_SERVER_URL],
    credentials: true,
    methods: ["HEAD", "POST", "PUT", "GET", "PATCH", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

//-- Controller Inject --
/**public Api */
app.use(
  API_BASE_URL_TYPE.publicBaseUrl + "/category",
  require("./domain/Category/CategoryController")
);
app.use(
  API_BASE_URL_TYPE.publicBaseUrl + "/user",
  require("./domain/User/UserController")
);
app.use(
  API_BASE_URL_TYPE.publicBaseUrl + "/auth",
  require("./domain/Auth/AuthController")
);
app.use(
  API_BASE_URL_TYPE.publicBaseUrl + "/interactive",
  require("./domain/InteractiveCount/InteractiveCountController")
);
app.use(
  API_BASE_URL_TYPE.publicBaseUrl + "/post",
  require("./domain/Post/PostController")
);
app.use(
  API_BASE_URL_TYPE.publicBaseUrl + "/comment",
  require("./domain/Comment/CommentController")
);
/**public Api */

/**private Api */
app.use(
  API_BASE_URL_TYPE.privateBaseUrl + "/user",
  require("./domain/User/UserPrivateController")
);
app.use(
  API_BASE_URL_TYPE.privateBaseUrl + "/post",
  require("./domain/Post/PostPrivateController")
);
app.use(
  API_BASE_URL_TYPE.privateBaseUrl + "/category",
  require("./domain/Category/CategoryPrivateController")
);
app.use(
  API_BASE_URL_TYPE.privateBaseUrl + "/comment",
  require("./domain/Comment/CommentPrivateController")
);
app.use(
  API_BASE_URL_TYPE.privateBaseUrl + "/interactive",
  require("./domain/InteractiveCount/InteractiveCountPrivateController")
);
app.use(
  API_BASE_URL_TYPE.privateBaseUrl + "/chat",
  require("./domain/Chat/ChatPrivateController")
);
/**private Api */
//-- Controller Inject --

// DB Connection
postgresDb.sequelize
  .sync()
  .then((dbInfo) => {
    console.log(`PostgresDB connected: ${dbInfo.config.host}`);
  })
  .catch((error) => {
    console.warn("postgresDb connection Error: ", error);
  });
mongoDb();
// DB Connection

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to run Server on ${PORT}=> ${err}`);
  } else {
    console.log(`Server Up: ${PORT}`);
  }
});
