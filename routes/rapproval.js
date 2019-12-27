const model = require('../models/index');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    model.Approval.findAll({}).then(result => {
        res.json(result);
    });
});
router.get('/:id', function (req, res, next) {
    model.Approval.findByPk(req.params.id).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Approval.findAll({
        where: req.body,
        attributes: { exclude: ['CreateDate', 'CreateBy', 'UpdateDate', 'UpdateBy', 'RowStatus'] },
        include: [
            { model: model.ApprovalDetail, where: { RowStatus: 1 }, required: false }
        ]
    }).then((result) => {
        res.json(result);
    })
});

router.post('/', function (req, res, next) {
    model.Approval.create(req.body).then((result) => {
        res.json(result);
    })
});

router.put('/', function (req, res, next) {
    model.Approval.update(req.body, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});

router.post('/detail', function (req, res, next) {
    model.ApprovalDetail.create(req.body).then((result) => {
        res.json(result);
    })
});

router.put('/detail', function (req, res, next) {
    model.ApprovalDetail.update(req.body, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});

router.post('/step', function (req, res, next) {
    model.ApprovalStep.create(req.body).then((result) => {
        res.json(result);
    })
});

router.put('/step', function (req, res, next) {
    model.ApprovalStep.update(req.body, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});

router.post('/step/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.ApprovalStep.findAll({
        where: req.body,
        attributes: { exclude: ['CreateDate', 'CreateBy', 'UpdateDate', 'UpdateBy'] },
        include: [
            { model: model.Employee, where: { RowStatus: 1 }, required: false, attributes: ['Id', 'FullName', 'NRP'] }
        ],
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['AppType', 'ASC'],
            ['StepNumber', 'ASC']
        ]
    }).then((result) => {
        res.json(result);
    })
});

module.exports = router;