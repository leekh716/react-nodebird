const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결");
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("server is running");
});
