const model = require('../models/index');
var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');

router.get('/', function (req, res, next) {
    model.MasterHoliday.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.MasterHoliday.findAll({
        where: req.body,
        attributes: { exclude: ['CreateDate', 'CreateBy', 'UpdateDate', 'UpdateBy'] }
    }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.MasterHoliday.create(req.body).then((result) => {
        res.json(result);
    })
});
router.put('/', function (req, res, next) {
    let obj = req.body;
    model.MasterHoliday.update(obj, { where: { Id: req.body.Id } }).then((result) => {
        res.json(result);
    })
});
router.get('/calendar', function (req, res, next) {
    model.sequelize.query("SELECT * FROM uv_calendarEvent where Year(Tanggal) = '"+(new Date()).getFullYear()+"'", { type: Sequelize.QueryTypes.SELECT })
        .then(cal => {
            res.json(cal);
            // We don't need spread here, since only the results will be returned for select queries
        })
});
module.exports = router;