var { sequelize, Sequelize } = require("../models/index");
const User = require("../models/user")(sequelize, Sequelize);

// 사용자 전체 조회 DESC 정렬
exports.getAllUsers = async (req, res) => {
    await User.findAll({ order: [["id", "DESC"]] })
      .then((result) => {
        res
          .status(200)
          .json({ code: 200, message: "사용자 목록조회 성공", data: { users: result } });
      })
      .catch((err) => {
        console.log(err);
      });
};

// get one user
exports.getUser = async (req, res) => {
  await User.findOne({
    where: { id: req.params.id },
  })
    .then((result) => {
      console.log(result);
      if (result) {
        res
          .status(200)
          .json({ code: 200, message: "사용자 조회 성공", data: { user: result } });
      } else {
        res
          .status(404)
          .json({ code: 404, message: "사용자가 존재하지 않습니다." });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
