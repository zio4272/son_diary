'use strict';

require("dotenv").config();
const bcrypt = require("bcrypt");

// 암호화
exports.encryptionPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// 복호화
exports.decryptionPassword = (password, encryptionPwd) => {
  return bcrypt.compareSync(password, encryptionPwd);
};