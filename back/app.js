const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

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
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("server is running");
});
