require("dotenv").config();
const jwt = require("jsonwebtoken");

// create access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: "360s",
  });
};

// create refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: "10d",
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    req.decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log(req.decoded, req.decoded.userId);
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

const verifyRefreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  try {
    req.decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const userId = req.decoded.userId;
    const loginId = req.decoded.loginId;
    const payload = { userId, loginId };

    return res.status(200).json({
      code: 200,
      message: "새로운 accessToken이 발급 되었습니다.",
      data: { access_token: createAccessToken(payload) },
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

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
