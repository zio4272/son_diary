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
 *                $ref: '#/components/schemas/Users'
 *        '400':
 *          description: Bad Request
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
 *                    example: Bad Request
 *        '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 401
 *                  message:
 *                    type: string
 *                    example: Unauthorized
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
 *          description: Bad Request
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
 *                    example: Bad Request
 *        '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 401
 *                  message:
 *                    type: string
 *                    example: Unauthorized
 *        '404':
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 404
 *                  message:
 *                    type: string
 *                    example: Not Found
 */
// get one user
router.get("/:id", token.verifyToken, user_controller.getUser);

module.exports = router;
