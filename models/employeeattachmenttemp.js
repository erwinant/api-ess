'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeAttachmentTemp = sequelize.define('EmployeeAttachmentTemp', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    AttachmentType: DataTypes.STRING,
    Filename: DataTypes.STRING,
    Systemname: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  EmployeeAttachmentTemp.associate = function (models) {
    // associations can be defined here
    EmployeeAttachmentTemp.belongsTo(models.Employee, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
  };
  return EmployeeAttachmentTemp;
};