'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApprovalDetail = sequelize.define('ApprovalDetail', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    ApprovalID: DataTypes.NUMBER,
    ReceiverID: DataTypes.NUMBER,
    ReceiverEmail: DataTypes.STRING,
    Status: DataTypes.STRING,
    Notes: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  ApprovalDetail.associate = function(models) {
    // associations can be defined here
    ApprovalDetail.belongsTo(models.Approval, {
      foreignKey: 'ApprovalID',
      onDelete: 'CASCADE'
    });
  };
  return ApprovalDetail;
};