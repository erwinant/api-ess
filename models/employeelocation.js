'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeLocation = sequelize.define('EmployeeLocation', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    LocationID: DataTypes.NUMBER,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeLocation.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeLocation;
};