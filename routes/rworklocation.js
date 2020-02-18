"use strict";
var model = require("../models/index");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  model.WorkLocation.findAll({}).then(result => {
    res.json(result);
  });
});
router.post("/cr", function(req, res, next) {
  model.WorkLocation.findAll({ where: req.body }).then(result => {
    res.json(result);
  });
});
router.post("/", function(req, res, next) {
  model.WorkLocation.create(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
    });
});
router.put("/", function(req, res, next) {
  model.WorkLocation.update(req.body, { where: { Id: req.body.Id } }).then(
    result => {
      res.json(result);
    }
  );
});

module.exports = router;
