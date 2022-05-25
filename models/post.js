"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamp: true,
      paranoid: true,
      underscored: true,
      tableName: "posts",
      chartset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Post;
};
