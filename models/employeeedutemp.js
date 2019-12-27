'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeEduTemp = sequelize.define('EmployeeEduTemp', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Degree: DataTypes.STRING,
    Institution: DataTypes.STRING,
    Major: DataTypes.STRING,
    Course: DataTypes.STRING,
    StartDate: DataTypes.STRING,
    EndDate: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  EmployeeEduTemp.associate = function (models) {
    // associations can be defined here
    EmployeeEduTemp.belongsTo(models.Employee, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
  };
  return EmployeeEduTemp;
};