const express = require("express");
const router = express.Router();

const token = require("../middleware/jwt");

const user_controller = require("../controllers/user_controller");

/**
 * @swagger
 * /user:
 *    get:
 *      summary: 사용자 목록조회
 *      description: 전체 사용자 목록 조회
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: 사용자 목록조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *        '400':
 *          description: 잘못된 요청
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/400BadRequest'
 *
 *        '401':
 *          description: 승인되지 않았습니다
 *          content:
 *            application/json:
 *              schema:
 *               $ref: '#/components/responses/401Unauthorized'
 */
// 사용자 전체 조회 DESC 정렬
router.get("/", token.verifyToken, user_controller.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *    get:
 *      summary: 사용자 조회
 *      description: 사용자 조회
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: id
 *      responses:
 *        200:
 *          description: 사용자 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '400':
 *          description: 잘못된 요청 입니다
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/400BadRequest'
 *        '401':
 *          description: 승인되지 않았습니다
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/401Unauthorized'
 *        '404':
 *          description: 존재하지 않습니다
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/404NotFound'
 */
// get one user
router.get("/:id", user_controller.getUser);

module.exports = router;
