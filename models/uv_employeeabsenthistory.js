'use strict';
module.exports = (sequelize, DataTypes) => {
  const uv_EmployeeAbsentHistory = sequelize.define('uv_EmployeeAbsentHistory', {
    CiID: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    CiRowStatus: DataTypes.NUMBER,
    CiCheckTime: DataTypes.STRING,
    CiAbsentType: DataTypes.NUMBER,
    CiLong: DataTypes.STRING,
    CiLat: DataTypes.STRING,
    CiPhoto: DataTypes.STRING,
    CiStatus: DataTypes.STRING,
    CiEmployeeID: DataTypes.NUMBER,
    CiAbsentDate: DataTypes.STRING,
    CoID: DataTypes.NUMBER,
    CoRowStatus: DataTypes.NUMBER,
    CoCheckTime: DataTypes.STRING,
    CoAbsentType: DataTypes.NUMBER,
    CoLong: DataTypes.STRING,
    CoLat: DataTypes.STRING,
    CoPhoto: DataTypes.STRING,
    CoStatus: DataTypes.STRING,
    CoEmployeeID: DataTypes.NUMBER,
    CoAbsentDate: DataTypes.STRING,
    FullName: DataTypes.STRING,
    NRP: DataTypes.STRING,
    LocationName: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  uv_EmployeeAbsentHistory.associate = function(models) {
    // associations can be defined here
  };
  return uv_EmployeeAbsentHistory;
};