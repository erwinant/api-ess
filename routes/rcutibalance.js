const model = require("../models/index");
var express = require("express");
var router = express.Router();
const moment = require("moment");
var sql = require("../const/cutibalance");

router.post("/checkBalance", function(req, res, next) {
  model.sequelize
    .query(sql.spCutiBalance, {
      type: model.sequelize.QueryTypes.SELECT,
      replacements: {
        EmployeeId: req.body.EmployeeID,
        TypeCuti: req.body.Type,
        LastDateCuti: req.body.TanggalAkhir
      }
    })
    .then(T => {
      res.json(T);
    })
    .catch(T => {
      res.status(500);
      res.json(T);
    });
});

module.exports = router;
