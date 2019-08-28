'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    LeaveType: DataTypes.STRING,
    LeaveBalance: DataTypes.STRING,
    StartPeriode: DataTypes.DATE,
    EndPeriode: DataTypes.DATE,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Leave.associate = function (models) {
    // associations can be defined here
  };
  return Leave;
};