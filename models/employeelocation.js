'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeLocation = sequelize.define('EmployeeLocation', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    LocationID: DataTypes.NUMBER,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
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