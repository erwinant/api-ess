const model = require('./models/index');
const express = require('express');
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = require('Sequelize').Op;
const commonFunction = require('./routes/commonFunction');
const schedule = require('node-schedule');
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 4)];
rule.hour = 14;
rule.minute = 0;

let j = schedule.scheduleJob(rule, function(){
  
});