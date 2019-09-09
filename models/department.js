'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Name: DataTypes.STRING,
    Initial: DataTypes.STRING,
    CostCenterCode: DataTypes.STRING,
    Location: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING,
    DivisionID: DataTypes.NUMBER,
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Department.associate = function (models) {
    // associations can be defined here
  };
  return Department;
};