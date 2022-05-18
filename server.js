const express = require("express");
const app = express();
var { sequelize, Sequelize } = require("./models/index");
// const bodyParser = require("body-parser");
const port = 3000;
const { swaggerUi, specs } = require("./swagger/swagger");

const authRouter = require("./routes/auth_router");
const userRouter = require("./routes/user_router");
const tokenRouter = require("./routes/middlewares");

// express 에서 바로 사용가능
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/token", tokenRouter);

// sequelize.sync();

// sequelize.sync().then(() => {
//   console.log("DB 연결 성공");
// });

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Run Server port ${port}`);
});
