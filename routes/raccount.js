const model = require('../models/index');
var express = require('express');
const Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
var router = express.Router();


router.get('/', function (req, res, next) {
    model.Account.findAll({}).then(result => {
        res.json(result);
    });
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Account.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    model.Account.create(req.body).then((result) => {
        res.json(result);
    })
});


//region account
router.post('/login', function (req, res, next) {
    if (req.body) {
        model.sequelize.query("EXEC sp_login :Username,:Password",
            { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(result => {
                if (result.length > 0) {
                    // create a token
                    let token = jwt.sign({ Username: req.body.Username }, config.secretKey, {
                        expiresIn: 31536000 // expires in 1 year
                    });
                    result[0].auth = true;
                    result[0].token = token;
                    res.json(result);
                } else {
                    res.json({ error: "No Content" });
                }
            })
    } else {
        res.json({ error: "No Content" });
    }
    // if (req.body) {
    //     users.loginUser(req.body.username, req.body.password, req.body.appcode, function (err, rows, fields) {
    //         if (err) { res.status(500); res.send('Internal Server Error'); }
    //         else {
    //             if (rows[0][0]) {
    // let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // // create a token
    // let token = jwt.sign({ username: req.body.username }, config.secret, {
    //     expiresIn: 86400 // expires in 24 hours
    // });
    // let result = rows[0][0];

    // res.setHeader('Content-Type', 'application/json');
    // res.status(200).send({ auth: true, token: token, username: req.body.username, appcode: result.AppCode, ic: result.IsConsultant });
    //             }
    //             else {
    //                 res.status(401);
    //                 res.send('Sorry, access not passed');
    //             }
    //         }

    //     });
    // }
});

// router.post('/register', function (req, res, next) {
//     if (req.body) {
//         users.registerUser(req.body.username, req.body.password, function (err, rows, fields) {
//             if (err) {
//                 if (err.errno === 1062) {
//                     res.status(200);
//                     res.setHeader('Content-Type', 'application/json');
//                     res.send({ "message": "Username already exist" });
//                 }
//             }
//             else {
//                 if (rows[0][0]) {
//                     res.setHeader('Content-Type', 'application/json');
//                     res.send(JSON.stringify(rows[0]));
//                 }
//                 else {
//                     res.status(401);
//                     res.send('Sorry, access not passed');
//                 }
//             }

//         });
//     }
// });

// router.post('/changepwd', function (req, res, next) {
//     if (req.body) {
//         users.changePasswordUser(req.body.username, req.body.password, function (err, rows, fields) {
//             if (err) {
//                 res.status(500);
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send({ "message": "Somethin Error" });
//             }
//             else {
//                 if (rows[0][0]) {
//                     res.setHeader('Content-Type', 'application/json');
//                     res.send(JSON.stringify(rows[0]));
//                 }
//                 else {
//                     res.status(401);
//                     res.send('Sorry, access not passed');
//                 }
//             }

//         });
//     }
// });



module.exports = router;