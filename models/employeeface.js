'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeFace = sequelize.define('EmployeeFace', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    Filename: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeFace.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeFace;
};