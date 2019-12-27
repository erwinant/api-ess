"use strict";

const getEmployee = (id, nrp, callback) => {
    const model = require('../models/index');
    let crit = id == null ? { NRP: nrp } : { Id: id };
    model.Employee.findAll({
        where: crit,
        raw: true
    }).then((result) => {
    callback(result);
})
}

const sendToAdmin = (req, callback) => {
    const env = process.env.NODE_ENV || 'development';
    const model = require('../models/index');
    const config = require(__dirname + '/../config/config.json')[env];
    let obj = req.body;
    console.log(obj);
    model.Employee.findAll({
        where: {
            Id: obj.EmployeeID
        }
    }).then((emp) => {
        let objEmp = emp[0];
        model.Employee.findAll({
            where: {
                NRP: '80000000'
            }
        }).then((admin) => {
            let objAdmin = admin[0];
            let url = config.baseUrl + "/#/main/reg-user/profile-main/" + objEmp.NRP;
            let buttonLink = "<a href='" + url + "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                "<b>Cek Sekarang</b>" +
                "</a><br/><br/>"
            let prop = "Perubahan data : <br/>";
            Object.keys(obj).forEach(key => { prop += key + " : " + obj[key] + "<br/>" });
            let signature = "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>"
            let message = "<b>Dh Bapak/Ibu HCD Admin,</b><br/><br/>Karyawan atas nama " + objEmp.FullName + " melakukan perubahan data diri.<br/>Mohon segera ditindaklanjut<br/><br/><br/>" + prop + "<br/><br/>" + buttonLink + signature;

            let objEmail = {
                Message: message,
                Sender: "ess-app@acset.co",
                Receiver: [objAdmin.EmailOffice, objAdmin.EmailPrivate],
                Subject: "[ess-app] Perubahan Data Diri - " + objEmp.FullName,
                Cc: ""
            }
            sendEmail(objEmail, cb => {
                console.log(cb);
            })
            saveMessage(objEmail, objEmp, objAdmin, cb => {
                console.log(cb);
            })
            callback("done");
        })
    })
}

const sendEmail = (obj, callback) => {
    if (obj) {
        var messagemail = obj;
        const nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            host: 'mail.acset.co',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "notification-master", // generated ethereal user
                pass: "Vfr45tgB$%" // generated ethereal password
            }
        });

        // send mail with defined transport object
        transporter.sendMail({
            from: messagemail.Sender,
            to: messagemail.Receiver,
            subject: messagemail.Subject,
            text: messagemail.Message,
            html: messagemail.Message,
        }, (err, info) => {
            callback(err || info);
        });

        // send the message and get a callback with an error or details of the message that was sent
        // server.send({
        //     text: messagemail.MessageBody,
        //     from: messagemail.MessageFrom,
        //     to: messagemail.MessageTo,
        //     subject: messagemail.MessageSubject,
        //     cc: messagemail.MessageCc,
        //     attachment:
        //         [
        //             { data: messagemail.MessageBody, alternative: true }
        //         ]
        // }, (err, message) => {
        //     //console.log(err || message);
        //     // if (err) { res.json(err); }
        //     // else { res.json(message); }
        //     callback(err || message);
        // });

    }
}

const saveMessage = (obj, emp, boss, callback) => {
    const model = require('../models/index');
    const moment = require('moment');
    let objMessage = obj;
    objMessage.ReadIt = 0;
    objMessage.RowStatus = 1;
    objMessage.Receiver = boss.Id;
    objMessage.Sender = emp.Id;
    objMessage.CreateDate = moment().format("YYYY-MM-DD HH:mm:ss");
    objMessage.CreateBy = "System"
    model.Message.create(objMessage).then((ins) => {
        callback(ins);
    }).catch((err) => {
        // handle error;
        callback(err);
    });
}

module.exports = {
    sendEmail: sendEmail,
    saveMessage: saveMessage,
    sendToAdmin: sendToAdmin,
    getEmployee: getEmployee
};