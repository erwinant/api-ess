'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeAbsent = sequelize.define('EmployeeAbsent', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    ClockIn: DataTypes.DATE,
    ClockOut: DataTypes.DATE,
    AbsenDate: DataTypes.DATE,
    EmployeeID: DataTypes.NUMBER,
    Long: DataTypes.NUMBER,
    Lat: DataTypes.NUMBER,
    Photo: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
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