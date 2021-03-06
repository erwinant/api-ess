'use strict';
module.exports = (sequelize, DataTypes) => {
  const uv_EmployeeAbsenceLembur = sequelize.define('uv_EmployeeAbsenceLembur', {
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
    PhotoIn:DataTypes.STRING,
    PhotoOut:DataTypes.STRING,
    LatIn:DataTypes.STRING,
    LongIn:DataTypes.STRING,
    LatOut:DataTypes.STRING,
    LongOut:DataTypes.STRING,
    Status:DataTypes.NUMBER,
    EmployeeID:DataTypes.NUMBER,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  uv_EmployeeAbsenceLembur.associate = function(models) {
    // associations can be defined here
  };
  return uv_EmployeeAbsenceLembur;
};