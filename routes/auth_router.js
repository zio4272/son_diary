const express = require("express");
const router = express.Router();

const token = require("../middleware/jwt");

const auth_controller = require("../controllers/auth_controller");

/**
 * @swagger
 *  /auth/register:
 *    post:
 *      summary: 회원가입
 *      description: 회원가입
 *      tags: [Auth]
 *      requestBody:
 *        description: 회원가입을 해주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              email: email@email.com
 *              password: string
 *              nick_name: string
 *
 *      responses:
 *        201:
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 * 
 *        400:
 *          description: 잘못된 요청
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/400BadRequest'
 *
 */
router.post("/register", auth_controller.registerUser);

/**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      summary: 로그인
 *      description: 로그인
 *      tags: [Auth]
 *      requestBody:
 *        description: 로그인을 해주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *                
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
 *                $ref: '#/components/responses/400BadRequest'
 */
// 로그인
router.post("/login", auth_controller.loginUser);

/**
 * @swagger
 * /auth/token:
 *    get:
 *      summary: accessToken 검증
 *      description: accessToken 검증을 위한 API
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: 검증 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Token'
 *        401:
 *          description: 유효하지 않은 토큰입니다.
 *          content:
 *             application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 401
 *                  message:
 *                    type: string
 *                    example: 유효하지 않은 토큰입니다.
 *        419:
 *          description: 토큰이 만료 되었습니다.
 *          content:
 *             application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 419
 *                  message:
 *                    type: string
 *                    example: 토큰이 만료 되었습니다.
 */
// accessToken 검증 테스트
router.get("/token", token.verifyToken, (req, res) => {
  res.json(req.decoded);
});

/**
 * @swagger
 * /auth/refresh:
 *    post:
 *      summary: refreshToken 으로 새로운 accessToken 발급
 *      description: refreshToken 으로 새로운 accessToken 발급하는 API
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: refresh_token을 입력해주세요.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refresh_token:
 *                  type: string
 *                  description: refresh token
 *      responses:
 *        200:
 *          description: access token 발급 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RefreshToken'
 *        401:
 *          description: 유효하지 않은 토큰입니다.
 *          content:
 *             application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 401
 *                  message:
 *                    type: string
 *                    example: 유효하지 않은 토큰입니다.
 *        419:
 *          description: 토큰이 만료 되었습니다.
 *          content:
 *             application/json:
 *              schema:
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 419
 *                  message:
 *                    type: string
 *                    example: 토큰이 만료 되었습니다.
 */
// refreshToken 으로 새로운 accessToken 발급
router.post("/refresh", token.verifyRefreshToken);

module.exports = router;
