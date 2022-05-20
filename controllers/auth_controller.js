var { sequelize, Sequelize } = require("../models/index");
const Users = require("../models/users")(sequelize, Sequelize);
require("dotenv").config();

const {
  createAccessToken,
  createRefreshToken,
} = require("../middleware/jwt");
const {
  encryptionPassword,
  decryptionPassword,
} = require("../middleware/bcrypt");

// TODO - user object return password hidden

exports.registerUser = async (req, res) => {
  const loginId = await req.body.login_id;
  const password = encryptionPassword(req.body.password); //패스워드암호화
  const nickName = await req.body.nick_name;

  await Users.create({
    login_id: loginId,
    password: password,
    nick_name: nickName,
  })
    .then((result) => {
      res.status(201).json({
        code: 201,
        message: "회원가입 성공",
        data: { user: result },
      });
    })
    .catch((err) => {
      // 에러메시지는 models에 unique custom
      res.status(400).json({ code: 400, message: err.errors[0].message });
    });
};

// 로그인
exports.loginUser = async (req, res) => {
  const loginId = req.body.login_id;
  const inputPassword = req.body.password;
  const user = await Users.findOne({
    where: {
      login_id: loginId,
    },
  });
  const password = decryptionPassword(inputPassword, user.password);
  if (!user) {
    res.status(404).json({ code: 404, message: "사용자 존재하지 않습니다." });
  } else {
    if (!password) {
      res.status(401).json({ code: 401, message: "비밀번호가 일치하지 않습니다. 😡" });
    } else {
      const userId = user.id;
      const userNickName = user.nick_name;
      const accessPayload = { userId, loginId };
      const refreshPayload = { userId, loginId, userNickName };
      const accessToken = createAccessToken(accessPayload);
      const refreshToken = createRefreshToken(refreshPayload);

      res.status(200).json({
        code: 200,
        message: "로그인 성공 😍",
        data: { user: user },
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }
};
