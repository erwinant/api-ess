const model = require('../models/index');
var express = require('express');
const Sequelize = require('sequelize');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
var router = express.Router();
const commonFunction = require('./commonFunction');

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
router.put('/', function (req, res, next) {
    let obj = req.body;
    model.Account.update(obj, { where: { Username: obj.Username } }).then((result) => {
        res.json(result);
    })
});
router.post('/register', function (req, res, next) {
    if (req.body) {
        const uuidv1 = require('uuid/v1');
        let obj = req.body;
        obj.Password = uuidv1().toString().substring(0, 6);
        model.sequelize.query("EXEC sp_AccountGenerator :Password,:Username,:FullName,:Gender,:Role,:EmailPrivate,:LocationID,:DivisionID,:DepartmentID,:OrganizationLevelID,:DirectReportID,:ClockIn,:ClockOut,:CreateBy",
            { replacements: obj, type: Sequelize.QueryTypes.SELECT }).then(result => {
                if (result.length) {
                    let insertedObj = result[0];
                    insertedObj.Password = obj.Password;
                    let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
                    let objEmail = {
                        Message: "<b>Selamat Bergabung " + obj.FullName + "</b>, <br/><br/>Pendaftaran akun ESS Anda telah berhasil,<br/>Mohon segera lengkapi profil Anda di " + config.baseUrl + ". <br/> Login dengan menggunakan : <br/><table><tr><th>Username</th><th>Password</th></tr><tr><td>" + obj.Username + "</td><td>" + obj.Password + "</td></table>" + signature,
                        Sender: "ess-app@acset.co",
                        Receiver: obj.EmailPrivate,
                        Subject: "[ess-app] New Registration Member",
                        Cc: ""
                    }
                    commonFunction.sendEmail(objEmail, cb => {

                    });
                    res.json(insertedObj);
                } else {
                    res.status(500).send({ error: "while insert to DB" });
                }
            }).catch(e => {
                if (e) {
                    res.status(500).send({ error: "not_unique" });
                }
            })
    } else {
        res.json({ error: "No Content" });
    }
});

router.post('/resetpwd', function (req, res, next) {
    if (req.body) {
        const uuidv1 = require('uuid/v1');
        let obj = req.body;
        obj.Password = uuidv1().toString().substring(0, 6);
        model.sequelize.query("EXEC sp_AccountUpdate :Username,:Password,:UpdateBy",
            { replacements: obj, type: Sequelize.QueryTypes.SELECT }).then(result => {
                if (result.length) {
                    let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
                    let objEmail = {
                        Message: "<b>Permintaan reset password oleh " + obj.FullName + "</b>, <br/><br/>Mohon segera login di " + config.baseUrl + ". <br/> Login dengan menggunakan : <br/><table><tr><th>Username</th><th>Password</th></tr><tr><td>" + obj.Username + "</td><td>" + obj.Password + "</td></table>" + signature,
                        Sender: "ess-app@acset.co",
                        Receiver: obj.EmailPrivate,
                        Subject: "[ess-app] Password Reset",
                        Cc: ""
                    }
                    commonFunction.sendEmail(objEmail, cb => {

                    });
                    res.json(result);
                } else {
                    res.status(500).send({ error: "while insert to DB" });
                }
            }).catch(e => {
                if (e) {
                    res.status(500).send({ error: "not_unique" });
                }
            })
    } else {
        res.json({ error: "No Content" });
    }
});

//region account
router.post('/login', function (req, res, next) {
    if (req.body) {
        model.sequelize.query("EXEC sp_login :Username,:Password",
            { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(result => {
                if (result.length > 0) {
                    model.uv_EmployeeQuickProfile.findAll({ where: { Username: req.body.Username } }).then((empQuickProfile) => {
                        let token = jwt.sign({ Username: req.body.Username }, config.secretKey, {
                            expiresIn: 432000 // expires in 1 year
                        });
                        result[0].auth = true;
                        result[0].token = token;
                        result[0].quickProfile = empQuickProfile[0];
                        res.json(result);
                    })

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

router.post('/chpwd', function (req, res, next) {
    if (req.body) {
        model.sequelize.query("EXEC sp_Login :Username,:Password",
            { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(result => {
                if (result.length > 0) {
                    model.sequelize.query("EXEC sp_AccountUpdate :Username,:NewPassword1, :UpdateBy",
                        { replacements: req.body, type: Sequelize.QueryTypes.SELECT }).then(up => {
                            if (up.length > 0) {
                                res.json(up);
                            } else {
                                res.json({ error: "No Content" });
                            }
                        })
                } else {
                    res.json({ error: "No Content" });
                }
            })
    } else {
        res.json({ error: "No Content" });
    }
});

module.exports = router;