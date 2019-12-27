const model = require('../models/index');
var express = require('express');
var router = express.Router();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = require('Sequelize').Op;
const commonFunction = require('./commonFunction');

router.get('/', function (req, res, next) {
    model.Absence.findAll({}).then(result => {
        res.json(result);
    });
});

router.get('/last', function (req, res, next) {
    let empId = req.query.empid;
    model.Absence.max('Id', { where: { EmployeeID: empId } }).then(result => {
        if (result) {
            model.Absence.findAll({ where: { Id: result } }).then(maxAbsen => {
                res.json(maxAbsen);
            })
        } else {
            res.json([]);
        }
    });
});
router.post('/history', function (req, res, next) {
    model.Absence.findAll(
        {
            where: {
                EmployeeID: req.body.EmployeeID,
                AbsentDate: {
                    [Op.lte]: req.body.DateEnd
                }
            }, limit: 8,
            order: [['Id', 'DESC']]
        }
    ).then(result => {
        res.json(result);
    });
});
router.post('/maintain/cr', function (req, res, next) {
    model.uv_EmployeeAbsence.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.Absence.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/cr/:page/:pagesize', function (req, res, next) {
    req.body.RowStatus = 1;
    const offset = req.params.page * req.params.pagesize;
    const limit = offset + pagesize;
    model.Absence.findAll({ limit, offset, where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/', function (req, res, next) {
    let objData = req.body;
    model.Absence.findAll({ where: { AbsentDate: req.body.AbsentDate, EmployeeID: req.body.EmployeeID } }).then((result) => {
        if (result.length > 0) { //update
            let objAbsen = result[0];
            model.Absence.update(req.body, { where: { AbsentDate: req.body.AbsentDate, EmployeeID: req.body.EmployeeID } }).then((up) => {
                if (objData.Status) {
                    if (objData.Status == 2) {
                        model.Employee.findAll({ where: { Id: req.body.EmployeeID }, include: ['Boss'] }).then(emp => {
                            emp = emp[0];
                            let boss = emp.Boss;
                            let url = config.baseUrl + "/#/main/admin/set-absence?idabs=" + objAbsen.Id + "&apabs=1";
                            let buttonLink = "<a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                                "<b>Cek Sekarang</b>" +
                                "</a><br/><br/>"

                            let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
                            let objEmail = {
                                Message: "<b>Dh Bapak/Ibu " + boss.FullName + ",</b><br/><br/>Absen karyawan atas nama " + emp.FullName + " membutuhkan approval Anda, karena ada koreksi/ketidaksesuaian waktu atau lokasi.<br/>Mohon segera ditindaklanjut<br/><br/><br/>" + buttonLink + signature,
                                Sender: "ess-app@acset.co",
                                Receiver: [boss.EmailPrivate, boss.EmailOffice],
                                Subject: "[ess-app] Approval Absen - " + emp.FullName,
                                Cc: ""
                            }
                            commonFunction.sendEmail(objEmail, cb => {
                                console.log(cb);
                            })
                            commonFunction.saveMessage(objEmail, emp, boss, cb => {
                                console.log(cb);
                            })
                            res.json(up);
                        })
                    }
                }
            }).catch((err) => {
                // handle error;
                res.json(err);
            });
        } else { //insert
            model.Absence.create(req.body).then((ins) => {

                res.json(ins);
            }).catch((err) => {
                // handle error;
                res.json(err);
            });
        }
    }).catch((err) => {
        // handle error;
        res.json(err);
    });
});

router.put('/:empid', function (req, res, next) {
    let objPut = req.body;
    model.Absence.update(objPut,
        { where: { Id: objPut.Id } }
    ).then((result) => {
        messageBuilder(req.params.empid, cb => {
            let emp = cb;
            let boss = cb.Boss;
            let receiver;
            let url = "";
            let buttonLink = "";
            let message = "Dh Bpk/Ibu ";
            let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
            switch (objPut.Status) {
                case 0:
                    url += config.baseUrl + "/#/main/admin/set-absence?idabs=" + objPut.Id;
                    buttonLink += "<br/><a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>";
                    message += emp.FullName + "<br/><br/>Pemberitahuan terkait data absen Anda telah ";
                    receiver = [boss.EmailPrivate, boss.EmailOffice, emp.EmailPrivate, emp.EmailOffice];
                    message += "<b>DITOLAK</b>" + " oleh Bpk/Ibu " + boss.FullName + buttonLink;
                    break;
                case 2:
                    url += config.baseUrl + "/#/main/admin/set-absence?idabs=" + objPut.Id + "&apabs=1";
                    buttonLink += "<br/><a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>";
                    message += boss.FullName + "<br/><br/>karyawan Anda atas nama " + emp.FullName + " telah melakukan ";
                    receiver = [boss.EmailPrivate, boss.EmailOffice];
                    message += "<b>KOREKSI</b> data Absen, mohon segera ditindaklanjuti." + buttonLink;
                    break;
                case 3:
                    url += config.baseUrl + "/#/main/admin/set-absence?idabs=" + objPut.Id;
                    buttonLink += "<br/><a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>";
                    message += emp.FullName + "<br/><br/>Pemberitahuan terkait data absen Anda telah ";
                    receiver = [boss.EmailPrivate, boss.EmailOffice, emp.EmailPrivate, emp.EmailOffice];
                    message += "<b>DISETUJUI</b>" + " oleh Bpk/Ibu " + boss.FullName + buttonLink;
                    break;
            }
            message += " pada tanggal " + moment().format("YYYY-MM-DD HH:mm:ss") + signature;
            let objEmail = {
                Message: message,
                Sender: "ess-app@acset.co",
                Receiver: receiver,
                Subject: "[ess-app] Update Absen - " + emp.FullName,
                Cc: ""
            }
            commonFunction.sendEmail(objEmail, cb => {
                console.log(cb);
            })
            if (objPut.Status == 2) {
                commonFunction.saveMessage(objEmail, emp, boss, cb => {
                    console.log(cb);
                })
            }
            else {
                commonFunction.saveMessage(objEmail, boss, emp, cb => {
                    console.log(cb);
                })
            }

        })
        res.json(result);
    })
});

const messageBuilder = (id, callback) => {
    model.Employee.findAll({
        where: { Id: id },
        include: ['Boss']
    }).then(emp => {
        callback(emp[0])
    }).catch(err => {
        callback(err);
    });
}

router.post('/upload', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    const uuidv1 = require('uuid/v1');
    if (req.files.image) {
        let myfile = req.files.image;
        let ftype = myfile.mimetype.split('/')[1];
        let storage = config.folderImageAbsen;
        myfile.name = uuidv1() + "." + ftype;

        myfile.mv(storage + myfile.name, function (err) {
            if (err)
                return res.status(500).send(err);
            res.status(200).send({ "filename": myfile.name });
        });
    }
});


//lembur
router.get('/lembur/', function (req, res, next) {
    model.AbsenceLembur.findAll({}).then(result => {
        res.json(result);
    });
});

router.get('/lembur/last', function (req, res, next) {
    let empId = req.query.empid;
    model.AbsenceLembur.max('Id', { where: { EmployeeID: empId } }).then(result => {
        if (result) {
            model.AbsenceLembur.findAll({ where: { Id: result } }).then(maxAbsen => {
                res.json(maxAbsen);
            })
        } else {
            res.json([]);
        }
    });
});
router.post('/lembur/history', function (req, res, next) {
    model.AbsenceLembur.findAll(
        {
            where: {
                EmployeeID: req.body.EmployeeID,
                AbsentDate: {
                    [Op.lte]: req.body.DateEnd
                }
            }, limit: 8,
            order: [['Id', 'DESC']]
        }
    ).then(result => {
        res.json(result);
    });
});
router.post('/lembur/maintain/cr', function (req, res, next) {
    model.uv_EmployeeAbsenceLembur.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/lembur/cr', function (req, res, next) {
    req.body.RowStatus = 1;
    model.AbsenceLembur.findAll({ where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/lembur/cr/:page/:pagesize', function (req, res, next) {
    req.body.RowStatus = 1;
    const offset = req.params.page * req.params.pagesize;
    const limit = offset + pagesize;
    model.AbsenceLembur.findAll({ limit, offset, where: req.body }).then((result) => {
        res.json(result);
    })
});
router.post('/lembur/', function (req, res, next) {
    model.AbsenceLembur.findAll({ where: { AbsentDate: req.body.AbsentDate, EmployeeID: req.body.EmployeeID } }).then((result) => {
        if (result.length > 0) { //update
            let objAbsen = result[0];
            model.AbsenceLembur.update(req.body, { where: { AbsentDate: req.body.AbsentDate, EmployeeID: req.body.EmployeeID } }).then((up) => {
                model.Employee.findAll({ where: { Id: req.body.EmployeeID }, include: ['Boss'] }).then(emp => {
                    emp = emp[0];
                    let boss = emp.Boss;
                    let url = config.baseUrl + "/#/main/admin/set-absence?idabs=" + objAbsen.Id + "&apabs=1&lembur=1";
                    let buttonLink = "<a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>"

                    let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
                    let objEmail = {
                        Message: "<b>Dh Bapak/Ibu " + boss.FullName + ",</b><br/><br/>Absen karyawan atas nama " + emp.FullName + " membutuhkan approval Anda, karena ada koreksi/ketidaksesuaian absen <b>lembur</b>.<br/>Mohon segera ditindaklanjut<br/><br/><br/>" + buttonLink + signature,
                        Sender: "ess-app@acset.co",
                        Receiver: [boss.EmailPrivate, boss.EmailOffice],
                        Subject: "[ess-app] Approval Lembur - " + emp.FullName,
                        Cc: ""
                    }
                    commonFunction.sendEmail(objEmail, cb => {
                        console.log(cb);
                    })
                    commonFunction.saveMessage(objEmail, emp, boss, cb => {
                        console.log(cb);
                    })
                    res.json(up);
                })
            }).catch((err) => {
                // handle error;
                res.json(err);
            });
        } else { //insert
            model.AbsenceLembur.create(req.body).then((ins) => {
                res.json(ins);
            }).catch((err) => {
                // handle error;
                res.json(err);
            });
        }
    }).catch((err) => {
        // handle error;
        res.json(err);
    });
});

router.put('/lembur/:empid', function (req, res, next) {
    let objPut = req.body;
    model.AbsenceLembur.update(objPut,
        { where: { Id: objPut.Id } }
    ).then((result) => {
        messageBuilder(req.params.empid, cb => {
            let emp = cb;
            let boss = cb.Boss;
            let receiver;
            let url = "";
            let buttonLink = "";
            let message = "Dh Bpk/Ibu ";
            let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
            switch (objPut.Status) {
                case 0:
                    url += config.baseUrl + "/#/main/admin/set-absence?idabs=" + objPut.Id;
                    buttonLink += "<br/><a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>";
                    message += emp.FullName + "<br/><br/>Pemberitahuan terkait data absen Anda telah ";
                    receiver = [boss.EmailPrivate, boss.EmailOffice, emp.EmailPrivate, emp.EmailOffice];
                    message += "<b>DITOLAK</b>" + " oleh Bpk/Ibu " + boss.FullName + buttonLink;
                    break;
                case 2:
                    url += config.baseUrl + "/#/main/admin/set-absence?idabs=" + objPut.Id + "&apabs=1";
                    buttonLink += "<br/><a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>";
                    message += boss.FullName + "<br/><br/>karyawan Anda atas nama " + emp.FullName + " telah melakukan ";
                    receiver = [boss.EmailPrivate, boss.EmailOffice];
                    message += "<b>KOREKSI</b> data Absen, mohon segera ditindaklanjuti." + buttonLink;
                    break;
                case 3:
                    url += config.baseUrl + "/#/main/admin/set-absence?idabs=" + objPut.Id;
                    buttonLink += "<br/><a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                        "<b>Cek Sekarang</b>" +
                        "</a><br/><br/>";
                    message += emp.FullName + "<br/><br/>Pemberitahuan terkait data absen Anda telah ";
                    receiver = [boss.EmailPrivate, boss.EmailOffice, emp.EmailPrivate, emp.EmailOffice];
                    message += "<b>DISETUJUI</b>" + " oleh Bpk/Ibu " + boss.FullName + buttonLink;
                    break;
            }
            message += " pada tanggal " + moment().format("YYYY-MM-DD HH:mm:ss") + signature;
            let objEmail = {
                Message: message,
                Sender: "ess-app@acset.co",
                Receiver: receiver,
                Subject: "[ess-app] Update Absen - " + emp.FullName,
                Cc: ""
            }
            commonFunction.sendEmail(objEmail, cb => {
                console.log(cb);
            })
            if (objPut.Status == 2) {
                commonFunction.saveMessage(objEmail, emp, boss, cb => {
                    console.log(cb);
                })
            }
            else {
                commonFunction.saveMessage(objEmail, boss, emp, cb => {
                    console.log(cb);
                })
            }

        })
        res.json(result);
    })
});

router.post('/lembur/upload', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    const uuidv1 = require('uuid/v1');
    if (req.files.image) {
        let myfile = req.files.image;
        let ftype = myfile.mimetype.split('/')[1];
        let storage = config.folderImageAbsen;
        myfile.name = uuidv1() + "." + ftype;

        myfile.mv(storage + myfile.name, function (err) {
            if (err)
                return res.status(500).send(err);
            res.status(200).send({ "filename": myfile.name });
        });
    }
});

module.exports = router;