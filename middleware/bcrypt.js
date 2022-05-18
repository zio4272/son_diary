'use strict';

require("dotenv").config();
const bcrypt = require("bcrypt");

// 암호화
const encryptionPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// 복호화
const decryptionPassword = (password, encryptionPwd) => {
  return bcrypt.compareSync(password, encryptionPwd);
};

module.exports = {
  encryptionPassword,
  decryptionPassword,
};
