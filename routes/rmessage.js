const model = require("../models/index");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  model.Message.findAll({}).then(result => {
    res.json(result);
  });
});
router.post("/cr", function(req, res, next) {
  req.body.RowStatus = 1;
  model.Message.findAll({
    where: req.body,
    attributes: { exclude: ["UpdateDate", "UpdateBy"] },
    include: [
      {
        model: model.Employee,
        attributes: ["FullName"]
      }
    ],
    order: [["CreateDate", "DESC"]]
  }).then(result => {
    res.json(result);
  });
});
router.post("/", function(req, res, next) {
  model.Message.create(req.body).then(result => {
    res.json(result);
  });
});
router.put("/", function(req, res, next) {
  let obj = req.body;
  model.Message.update(obj, { where: { Id: req.body.Id } }).then(result => {
    res.json(result);
  });
});

router.get("/countMessageUnread/:EmployeeID", async function(req, res) {
  const param = {
    Receiver: req.params.EmployeeID,
    ReadIt: 0,
    RowStatus: 1
  };
  let count = await model.Message.count({ where: param });
  res.json(count);
});

module.exports = router;
