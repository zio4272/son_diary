const express = require("express");
const router = express.Router();

const token = require("../middleware/jwt");

const post_controller = require("../controllers/post_controller");
/**
 * @swagger
 *  /post:
 *    get:
 *      summary: 게시물 목록 조회
 *      description: 게시물 목록 조회
 *      tags: [Post]
 *      responses:
 *        200:
 *          description: 게시물 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Posts'
 *        400:
 *          description: 잘못된 요청
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/400BadRequest'
 *        401:
 *          description: 승인되지 않았습니다
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/401Unauthorized'
 */
router.get("/", post_controller.getAllPosts);

/**
 * @swagger
 *  /post:
 *    post:
 *      summary: 게시물 등록
 *      description: 게시물 등록
 *      tags: [Post]
 *      requestBody:
 *        description: 내용을입력해주세요
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *            example:
 *              title: string
 *              content: string
 *      responses:
 *        200:
 *          description: 게시물 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 *        400:
 *          description: 잘못된 요청
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/400BadRequest'
 *        401:
 *          description: 승인되지 않았습니다
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/401Unauthorized'
 */
router.post("/", token.verifyToken, post_controller.addPost);

module.exports = router;
