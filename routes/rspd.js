const model = require('../models/index');
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', function (req, res, next) {
    model.Spd.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Spd.findAll({
        where: req.body
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Spd.create(req.body).then((result) => {
        let obj = result.get({plain:true});
        let incemental = "00000000"+obj.Id.toString();
        obj.SpdNo = 'SPD-'+moment().format('YY')+incemental.slice(-4);
        model.Spd.update(obj, { where: { Id: obj.Id } }).then((up) => {
            res.json(result);
        })
    })
});
router.put('/', function (req, res, next) {
    let obj = req.body;
    model.Spd.update(obj, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});
module.exports = router;