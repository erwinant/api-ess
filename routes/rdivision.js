const model = require('../models/index');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    model.Division.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Division.findAll({
        where: req.body,
        attributes: {
            exclude: ['CreateDate', 'CreateBy', 'UpdateDate', 'UpdateBy']
        },
        include: [
            { model: model.Department, where: { RowStatus: 1 }, required: false }
        ]
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Division.create(req.body).then((result) => {
        res.json(result);
    })
});
router.put('/', function (req, res, next) {
    let obj = req.body;
    model.Division.update(obj, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});
module.exports = router;