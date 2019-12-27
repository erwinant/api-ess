const model = require('../models/index');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    model.Department.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Department.findAll({
        where: req.body,
        attributes: { exclude: ['CreateDate','CreateBy','UpdateDate','UpdateBy','RowStatus'] }
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Department.create(req.body).then((result) => {
        res.json(result);
    })
});

module.exports = router;