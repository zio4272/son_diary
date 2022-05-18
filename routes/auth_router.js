const express = require("express");
const router = express.Router();
var { sequelize, Sequelize } = require("../models/index");
const Users = require("../models/users")(sequelize, Sequelize);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  verifyRefreshToken,
} = require("../middleware/jwt");
const {
  encryptionPassword,
  decryptionPassword,
} = require("../middleware/bcrypt");

// TODO - user object return password hidden

/**
 * @swagger
 *  /auth/register:
 *    post:
 *      summary: 회원가입
 *      description: 회원가입
 *      tags: [Users]
 *      requestBody:
 *        description: 회원가입을 해주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Register'
 *
 *      responses:
 *        201:
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: 잘못된 요청.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: 잘못된 요청.
 *
 */
router.post("/register", async (req, res) => {
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
});

/**
 * @swagger
 *  /auth/login:
 *    post:
 *      summary: 로그인
 *      description: 로그인
 *      tags: [Users]
 *      requestBody:
 *        description: 로그인을 해주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *
 *      responses:
 *        200:
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        400:
 *          description: 잘못된 요청.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: 잘못된 요청.
 *
 */
// 로그인
router.post("/login", async (req, res) => {
  const loginId = req.body.login_id;
  const inputPassword = req.body.password;
  const user = await Users.findOne({
    where: {
      login_id: loginId,
    },
  });
  const password = decryptionPassword(inputPassword, user.password);
  if (!user) {
    res.status(404).json({ code: 404, message: "user not found" });
  } else {
    if (!password) {
      res.status(401).json({ code: 401, message: "password 😡" });
    } else {
      const userId = user.id;
      const userNickName = user.nick_name;
      const accessPayload = { userId, loginId };
      const refreshPayload = { userId, loginId, userNickName };
      const accessToken = createAccessToken(accessPayload);
      const refreshToken = createRefreshToken(refreshPayload);

      res.status(200).json({
        code: 200,
        message: "welcome!! 😍",
        data: { user: user },
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  }
});

// accessToken 검증 테스트
router.get("/check", verifyToken, async (req, res) => {
  res.json(req.decoded);
});

// refreshToken 으로 새로운 accessToken 발급
router.post("/token", verifyRefreshToken, async (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
