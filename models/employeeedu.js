'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeEdu = sequelize.define('EmployeeEdu', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    Degree: DataTypes.STRING,
    Institution: DataTypes.STRING,
    Major: DataTypes.STRING,
    Course: DataTypes.STRING,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeEdu.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeEdu;
};