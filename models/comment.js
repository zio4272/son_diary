"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamp: true,
      paranoid: true,
      underscored: true,
      tableName: "comments",
      chartset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Comment;
};
