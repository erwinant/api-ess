"use strict";
module.exports = (sequelize, DataTypes) => {
  const Absence = sequelize.define(
    "Absence",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      RowStatus: DataTypes.NUMBER,
      AbsentDate: DataTypes.STRING,
      ClockIn: DataTypes.STRING,
      ClockOut: DataTypes.STRING,
      LongIn: DataTypes.STRING,
      LatIn: DataTypes.STRING,
      LongOut: DataTypes.STRING,
      LatOut: DataTypes.STRING,
      LocationID: DataTypes.NUMBER,
      PhotoIn: DataTypes.STRING,
      PhotoOut: DataTypes.STRING,
      Status: DataTypes.STRING,
      EmployeeID: DataTypes.NUMBER,
      ShiftID: DataTypes.NUMBER,
      Notes: DataTypes.STRING,
      StatusIn: DataTypes.STRING,
      StatusOut: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Absence.associate = function(models) {
    // associations can be defined here
  };
  return Absence;
};
