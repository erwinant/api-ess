'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeAbsent = sequelize.define('EmployeeAbsent', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    ClockIn: DataTypes.STRING,
    ClockOut: DataTypes.STRING,
    AbsenDate: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    Long: DataTypes.NUMBER,
    Lat: DataTypes.NUMBER,
    Photo: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeAbsent.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeAbsent;
};