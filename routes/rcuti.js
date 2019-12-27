const model = require('../models/index');
var express = require('express');
var router = express.Router();
const moment = require('moment');

router.get('/', function (req, res, next) {
    model.MasterCuti.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.MasterCuti.findAll({
        where: req.body,
        attributes: { exclude: ['CreateDate','CreateBy','UpdateDate','UpdateBy'] },
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.MasterCuti.create(req.body).then((result) => {
        res.json(result);
    })
});
router.put('/', function (req, res, next) {
    let obj = req.body;
    model.MasterCuti.update(obj, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});


/////cuti doc
router.get('/doc/', function (req, res, next) {
    model.Cuti.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/doc/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Cuti.findAll({
        where: req.body,
        include: [
            { model: model.MasterCuti, where: { RowStatus: 1 }, required: false, attributes: ['Id', 'Type', 'Description', 'Quota'] },
            { model: model.Employee, where: { RowStatus: 1 }, required: false, attributes: ['Id', 'FullName', 'NRP'] }
        ]
    }).then((result) => {
        res.json(result);
    })
});
router.post('/doc', function (req, res, next) {
    model.Cuti.create(req.body).then((result) => {
        let obj = result.get({plain:true});
        let incemental = "00000000"+obj.Id.toString();
        obj.DocNo = 'LVS-'+moment().format('YY')+incemental.slice(-4);
        model.Cuti.update(obj, { where: { Id: obj.Id } }).then((up) => {
            res.json(result);
        })
    })
});
router.put('/doc', function (req, res, next) {
    let obj = req.body;
    model.Claim.update(obj, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});
module.exports = router;