"use strict";

const Sequelize = require("sequelize");
const db = {};

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
  Comment.associate = (db) => {
    Comment.belongsTo(db.Post, {
      foreignKey: "post_id",
    });
    Comment.belongsTo(db.User, {
      foreignKey: "user_id",
    });
  };
  return Comment;
};
