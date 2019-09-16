const model = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    model.Location.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    model.Location.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    
    model.Location.create(req.body).then((result) => {
        res.json(result);
    }).catch(err=>{
        console.log(err)
    })
});
router.put('/', function (req, res, next) {
    model.Location.update(req.body,
        { where: { Id: req.body.Id } }
    ).then((result) => {
        res.json(result);
    })
});

module.exports = router;