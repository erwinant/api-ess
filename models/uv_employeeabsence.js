"use strict";
module.exports = (sequelize, DataTypes) => {
  const uv_EmployeeAbsence = sequelize.define(
    "uv_EmployeeAbsence",
    {
      Id: {
        primaryKey: true,
        type: DataTypes.STRING
      },
      AbsentDate: DataTypes.STRING,
      ClockIn: DataTypes.STRING,
      ClockOut: DataTypes.STRING,
      NRP: DataTypes.STRING,
      FullName: DataTypes.STRING,
      EmpClockIn: DataTypes.STRING,
      EmpClockOut: DataTypes.STRING,
      EmpLong: DataTypes.STRING,
      EmpLat: DataTypes.STRING,
      EmpLocName: DataTypes.STRING,
      EmpRadius: DataTypes.STRING,
      PhotoIn: DataTypes.STRING,
      PhotoOut: DataTypes.STRING,
      LatIn: DataTypes.STRING,
      LongIn: DataTypes.STRING,
      LatOut: DataTypes.STRING,
      LongOut: DataTypes.STRING,
      Status: DataTypes.NUMBER,
      EmployeeID: DataTypes.NUMBER,
      DirectReportID: DataTypes.NUMBER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  uv_EmployeeAbsence.associate = function(models) {
    // associations can be defined here
  };
  return uv_EmployeeAbsence;
};
