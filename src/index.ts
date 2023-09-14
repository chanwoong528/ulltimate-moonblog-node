//@ts-nocheck
require("dotenv").config({ path: "./env/db.env" });
require("dotenv").config({ path: "./env/auth.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const postgresDb = require("./Model/postgres.index");
const mongoDb = require("./Model/mongo.index");

/** Controller */
const categoryController = require("./domain/Category/CategoryController");
const userController = require("./domain/User/UserController");
const authController = require("./domain/Auth/AuthController");

const postController = require("./domain/Post/PostController");
const commentController = require("./domain/Comment/CommentController");
/** Controller */

const app = express();
const PORT = process.env.PORT || 5002;

app.use(
  cors({
    origin: [],
    credentials: true,
    methods: ["HEAD", "POST", "PUT", "GET", "PATCH", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

//Controller Inject
app.use("/category", categoryController);
app.use("/user", userController);
app.use("/auth", authController);

app.use("/post", postController);
app.use("/guestbook", commentController);
//Controller Inject

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
