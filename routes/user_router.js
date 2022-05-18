const express = require("express");
const router = express.Router();
var { sequelize, Sequelize } = require("../models/index");
const Users = require("../models/users")(sequelize, Sequelize);
const { verifyToken } = require("./middlewares");

// 사용자 전체 조회 DESC 정렬
router.get("/", async (req, res) => {

  await Users.findAll({ order: [["id", "DESC"]] })
    .then((result) => {
      res
        .status(200)
        .json({ code: 200, message: "success", data: { users: result } });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get one user
router.get("/:id", async (req, res) => {
  await Users.findOne({
    where: { id: req.params.id },
  })
    .then((result) => {
      console.log(result);
      if (result) {
        res
          .status(200)
          .json({ code: 200, message: "success", data: { user: result } });
      } else {
        res.status(404).json({ code: 404, message: "not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
