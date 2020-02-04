"use strict";
module.exports = (sequelize, DataTypes) => {
  const EmployeeTraining = sequelize.define(
    "EmployeeTraining",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      RowStatus: DataTypes.NUMBER,
      Institution: DataTypes.STRING,
      CertificateNo:DataTypes.STRING,
      Description: DataTypes.STRING,
      Year: DataTypes.STRING,
      ValidDate: DataTypes.STRING,
      InvalidDate: DataTypes.STRING,
      CreateDate: DataTypes.STRING,
      CreateBy: DataTypes.STRING,
      UpdateDate: DataTypes.STRING,
      UpdateBy: DataTypes.STRING,
      EmployeeID: DataTypes.NUMBER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  EmployeeTraining.associate = function(models) {
    // associations can be defined here
    EmployeeTraining.belongsTo(models.Employee, {
      foreignKey: "EmployeeID",
      onDelete: "CASCADE"
    });
  };
  return EmployeeTraining;
};
