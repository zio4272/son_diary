"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Users = require("./users")(sequelize, Sequelize);
const Posts = require("./posts")(sequelize, Sequelize);
const Comments = require("./comments")(sequelize, Sequelize);

// Users : N
Users.hasMany(Posts, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
    constraints: true,
  },
});

// Posts : 1
Posts.belongsTo(Users, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Posts.hasMany(Comments, {
  foreignKey: {
    name: "post_id",
    allowNull: false,
    constraints: true,
  },
});

Users.hasMany(Comments, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
    constraints: true,
  },
});

Comments.belongsTo(Posts, {
  foreignKey: {
    name: "post_id",
    allowNull: false,
  },
});

Comments.belongsTo(Users, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

module.exports = db;
