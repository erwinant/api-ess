const model = require("./models/index");
const express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];
const moment = require("moment");
const Op = require("Sequelize").Op;
const commonFunction = require("./routes/commonFunction");
const schedule = require("node-schedule");
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 7)];
rule.hour = 01;
rule.minute = 01;
rule.second = 01;

/* let j =  */ schedule.scheduleJob(rule, () => {
  /*     model.MasterHoliday.findAll({
        where: {
            RowStatus: 1,
            Holidate: moment().format('YYYY-MM-DD')
        },
        raw: true
    }).then((holiday) => {
        if (holiday.length == 0) { */
  model.Employee.findAll({
    where: { RowStatus: 1 },
    raw: true
  }).then(emp => {
    emp.forEach(i => {
      let absen = {
        RowStatus: 1,
        AbsentDate: moment().format("YYYY-MM-DD"),
        EmployeeID: i.Id
      };
      model.Absence.create(absen).then(insAbs => {
        console.log(insAbs);
      });
    });
  });
  /*  }
    }) */
});

module.exports = router;
