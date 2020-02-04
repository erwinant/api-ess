const model = require("./models/index");
var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const moment = require("moment");
const Op = require("Sequelize").Op;
const commonFunction = require("./routes/commonFunction");
const schedule = require("node-schedule");
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 4)];
rule.hour = 14;
rule.minute = 0;

//jalan tiap 1 menit
schedule.scheduleJob("*/1 * * * *", () => {
/*   model.Approval.findAll({
    where: {
      DocStatus: model.sequelize.literal(
        "([Approval].[DocStatus] = 'INIT' OR [Approval].[DocStatus] LIKE '%APPROVE%')"
      ),
      [Op.and]: [
        model.sequelize.literal(
          "[Approval].[StepCurrent] < [Approval].[StepCount]"
        )
      ]
    },
    raw: true,
    nest: true,
    include: [
      {
        model: model.Employee,
        where: { RowStatus: 1 },
        required: false,
        include: ["Boss"]
      }
    ]
  }).then(apprHeader => {
    apprHeader.forEach(eachAppr => {
      model.ApprovalStep.findAll({
        where: {
          AppType: eachAppr.AppType,
          StepNumber: eachAppr.StepCurrent + 1
        },
        raw: true
      }).then(appStep => {
        //check direct email / organization
        appStep = appStep[0];
        if (appStep.Email) {
          // direct mail
          //get the person by email (let say the boss)
          model.Employee.findAll({
            where: {
              [Op.or]: [
                { EmailOffice: appStep.Email },
                { EmailPrivate: appStep.Email }
              ]
            },
            raw: true
          }).then(theBoss => {
            //})
            let boss = theBoss[0];
            let apprDet = {
              RowStatus: 1,
              ApprovalID: eachAppr.Id,
              ReceiverEmail: appStep.Email,
              Status: 0, //send
              Notes: "",
              CreateDate: moment().format("YYYY-MM-DD HH:mm:ss"),
              CreateBy: "System"
            };
            model.ApprovalDetail.create(apprDet).then(insDet => {
              model.Approval.update(
                { DocStatus: "MENUNGGU APPROVAL " + appStep.Email },
                { where: { Id: eachAppr.Id } }
              ).then(up => {
                let emp = eachAppr.Employee;
                let url =
                  config.baseUrl +
                  "/#/main/admin/set-absence?idabs=" +
                  eachAppr.Id +
                  "&apabs=1&lembur=1";
                let buttonLink =
                  "<a href='" +
                  url +
                  "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                  "<b>Cek Sekarang</b>" +
                  "</a><br/><br/>";

                let signature =
                  "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>";
                let objEmail = {
                  Message:
                    "<b>Dh Bapak/Ibu,</b><br/><br/>Permintaan karyawan atas nama " +
                    emp.FullName +
                    " membutuhkan approval Anda<br/>Mohon segera ditindaklanjut<br/><br/><br/>" +
                    buttonLink +
                    signature,
                  Sender: "ess-app@acset.co",
                  Receiver: [appStep.Email],
                  Subject:
                    "[ess-app] Approval " +
                    eachAppr.AppType +
                    " - " +
                    emp.FullName,
                  Cc: ""
                };
                commonFunction.sendEmail(objEmail, cb => {
                  console.log(cb);
                });
                commonFunction.saveMessage(objEmail, emp, boss, cb => {
                  console.log(cb);
                });
              });
            });
          });
        } else {
          //go organization
          if (eachAppr.Employee.Boss.Id == null) {
            //tidak ada boss
            console.log("No Boss");
          } else {
            let apprDet = {
              RowStatus: 1,
              ApprovalID: eachAppr.Id,
              ReceiverID: eachAppr.Employee.Boss.Id,
              ReceiverEmail: eachAppr.Employee.Boss.EmailOffice,
              Status: 0, //send
              Notes: "",
              CreateDate: moment().format("YYYY-MM-DD HH:mm:ss"),
              CreateBy: "System"
            };
            model.ApprovalDetail.create(apprDet).then(insDet => {
              model.Approval.update(
                {
                  DocStatus:
                    "MENUNGGU APPROVAL " + eachAppr.Employee.Boss.EmailOffice
                },
                { where: { Id: eachAppr.Id } }
              ).then(up => {
                let emp = eachAppr.Employee;
                let boss = eachAppr.Employee.Boss;
                let url =
                  config.baseUrl +
                  "/#/main/admin/set-absence?idabs=" +
                  eachAppr.Id +
                  "&apabs=1&lembur=1";
                let buttonLink =
                  "<a href='" +
                  url +
                  "' style='width: 300px; padding: 12px; cursor: pointer; box-shadow: 1px 1px 3px #000; -webkit-box-shadow: 1px 1px 3px #000; -moz-box-shadow: 1px 1px 3px #000; font-weight: bold; background: #203072; color: #fff; border-radius: 10px;text-decoration:none;font-family:verdana'>" +
                  "<b>Cek Sekarang</b>" +
                  "</a><br/><br/>";

                let signature =
                  "<br/><br/>Mohon tidak membalas email ini. Email otomatis yang dikirimkan ess-app.<br/>";
                let objEmail = {
                  Message:
                    "<b>Dh Bapak/Ibu " +
                    boss.FullName +
                    ",</b><br/><br/>Permintaan karyawan atas nama " +
                    emp.FullName +
                    " membutuhkan approval Anda<br/>Mohon segera ditindaklanjut<br/><br/><br/>" +
                    buttonLink +
                    signature,
                  Sender: "ess-app@acset.co",
                  Receiver: [boss.EmailPrivate, boss.EmailOffice],
                  Subject:
                    "[ess-app] Approval " +
                    eachAppr.AppType +
                    " - " +
                    emp.FullName,
                  Cc: ""
                };
                commonFunction.sendEmail(objEmail, cb => {
                  console.log(cb);
                });
                commonFunction.saveMessage(objEmail, emp, boss, cb => {
                  console.log(cb);
                });
              });
            });
          }
        }
      });
    });
  }); */
});

module.exports = router;
