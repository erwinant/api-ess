'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApprovalStep = sequelize.define('ApprovalStep', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    AppType: DataTypes.STRING,
    StepNumber: DataTypes.NUMBER,
    Email: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING,
    EmployeeID:DataTypes.NUMBER,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  ApprovalStep.associate = function(models) {
    // associations can be defined here
    ApprovalStep.belongsTo(models.Employee, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
  };
  return ApprovalStep;
};