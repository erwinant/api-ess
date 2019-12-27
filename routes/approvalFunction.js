"use strict";
const model = require('../models/index');



const addApproval = (obj, callback) => {
    model.Approval.create(obj).then((result) => {
        callback(result);
    })
}

const addApprovalDetail = (obj, callback) => {
    model.ApprovalDetail.create(obj).then((result) => {
        callback(result);
    })
}

const addApprovalStep = (obj, callback) => {
    model.ApprovalStep.create(obj).then((result) => {
        callback(result);
    })
}

const getApprovalStep = (obj, callback) => {
    model.ApprovalStep.findAll({ where: obj }).then((result) => {
        callback(result);
    })
}

module.exports = {
    addApproval: addApproval,
    addApprovalDetail: addApprovalDetail,
    getApprovalStep: getApprovalStep,
    addApprovalStep:addApprovalStep
};