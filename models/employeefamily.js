'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeFamily = sequelize.define('EmployeeFamily', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    FullName: DataTypes.STRING,
    Relation: DataTypes.STRING,
    BirthPlace: DataTypes.STRING,
    BirthDate: DataTypes.STRING,
    BloodType: DataTypes.STRING,
    Gender: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
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