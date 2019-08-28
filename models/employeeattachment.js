'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeAttachment = sequelize.define('EmployeeAttachment', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    AttachmentType: DataTypes.STRING,
    Filename: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeAttachment.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeAttachment;
};