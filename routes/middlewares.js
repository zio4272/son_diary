const jwt = require("jsonwebtoken");
const router = require("express").Router();
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    return next();
  } catch (err) {
    // console.log(err.name, err.message, err);
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료 되었습니다.",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

// 토큰 테스트
router.get("/test", this.verifyToken, (req, res) => {
  res.json(req.decoded);
  // {
  //   "nickName": "TESTUSER",
  //   "iat": 1652173531,
  //   "exp": 1652173591,
  //   "iss": "토큰발급자"
  // }
});

module.exports = router;