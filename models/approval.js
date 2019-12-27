'use strict';
module.exports = (sequelize, DataTypes) => {
  const Approval = sequelize.define('Approval', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    AppType: DataTypes.STRING,
    DocID: DataTypes.NUMBER,
    DocNumber: DataTypes.STRING,
    DocStatus: DataTypes.STRING,
    StepCurrent: DataTypes.NUMBER,
    StepCount: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  Approval.associate = function (models) {
    // associations can be defined here
    Approval.hasMany(models.ApprovalDetail, {
      foreignKey: 'ApprovalID',
      onDelete: 'CASCADE'
    });
  };
  return Approval;
};