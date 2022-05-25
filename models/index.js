const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*모델 읽기*/
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);


/*모델 관계 정의*/

// User Post
db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id", as:"post" });
db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" ,as: "user" });

// Post Comment
db.Post.hasMany(db.Comment, { foreignKey: "post_id", sourceKey: "id", as: "comments" });
db.Comment.belongsTo(db.Post, { foreignKey: "post_id", targetKey: "id", as:"post" });

// User Comment
db.User.hasMany(db.Comment, { foreignKey: "user_id", sourceKey: "id" });
db.Comment.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id", as: "user" });

module.exports = db;
