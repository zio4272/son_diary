"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "Users",
    {
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "이메일 양식이 올바르지 않습니다."
          }
        },
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      nick_name: {
        type: Sequelize.STRING(20),
        unique: { msg: "이미 존재하는 닉네임 입니다." },
        allowNull: false,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamp: true,
      paranoid: true,
      underscored: true,
      tableName: "users",
      charset: "utf8",
      collate: "utf8_unicode_ci",
      //     defaultScope: { // 비밀번호는 리턴값에서 제외
      //       attributes: { exclude: ["password"] },
      //     },
    }
  );
  return users;
};
