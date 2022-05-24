require("dotenv").config();
const jwt = require("jsonwebtoken");

// create access token
exports.createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: "1h",
  });
};

// create refresh token
exports.createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: "10d",
  });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ code: 401, message: "토큰값은 필수입니다." });
  }
  const token = authHeader.split(" ")[1];
  try {
    req.decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    return next();
  } catch (err) {
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

exports.verifyRefreshToken = (req, res) => {
  const refreshToken = req.body.refresh_token;
  try {
    req.decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const userId = req.decoded.userId;
    const email = req.decoded.email;
    const payload = { userId, email };
    const accessToken = this.createAccessToken(payload);
    return res.status(200).json({
      code: 200,
      message: "새로운 accessToken이 발급 되었습니다.",
      data: { access_token: accessToken },
    });
  } catch (err) {
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