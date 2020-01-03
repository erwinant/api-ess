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
        attributes: { exclude: ['CreateDate', 'CreateBy', 'UpdateDate', 'UpdateBy'] },
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
        let obj = result.get({ plain: true });
        let incemental = "00000000" + obj.Id.toString();
        obj.DocNo = 'LVS-' + moment().format('YY') + incemental.slice(-4);

        //approval
        model.ApprovalStep.findAll({
            where: { AppType: 'CUTI' },
            raw: true
        }).then((step) => {
            model.Employee.findAll({
                where: { NRP: obj.CreateBy },
                raw: true
            }).then((emp) => {
                const moment = require('moment');
                let myEmp = emp[0];
                let appr = {
                    RowStatus: 1,
                    AppType: 'CUTI',
                    DocID: obj.Id,
                    DocNumber: obj.DocNo,
                    StepCurrent: 0,
                    StepCount: step.length,
                    DocStatus: 'INIT',
                    CreateDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                    CreateBy: obj.CreateBy,
                    InitiatorID:myEmp.Id
                }
                model.Approval.create(appr).then((ins) => {
                    
                })
            })
        })
        //end approval

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