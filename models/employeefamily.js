'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeFamily = sequelize.define('EmployeeFamily', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    FullName: DataTypes.STRING,
    Relation: DataTypes.STRING,
    BirthPlace: DataTypes.STRING,
    BirthDate: DataTypes.DATE,
    BloodType: DataTypes.STRING,
    Gender: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeFamily.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeFamily;
};