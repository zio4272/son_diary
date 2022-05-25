const { Post, User, Comment } = require("../models/index");

// POST 전체 조회 DESC 정렬
exports.getAllPosts = async (req, res) => {
  await Post.findAll({
    order: [["id", "DESC"]],
    include: [
      { model: User, as: "user" },
      {
        model: Comment,
        as: "comments",
        include: [{ model: User, as: "user" }],
      },
    ],
  })
    .then((result) => {
      res.status(200).json({
        code: 200,
        message: "게시물 목록조회 성공",
        data: { posts: result },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPost = async (req, res) => {
  const isAuth = req.decoded;
  const title = req.body.title;
  const content = req.body.content;
  await Post.create({
    user_id: isAuth.user_id,
    title: title,
    content: content,
  })
    .then((result) => {
      res.status(201).json({
        code: 201,
        message: "게시물 작성 성공",
        data: { post: result },
      });
    })
    .catch((err) => {
      res.status(400).json({ code: 400, message: err.errors[0].message });
    });
};
