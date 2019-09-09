'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationLevel = sequelize.define('OrganizationLevel', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Name: DataTypes.STRING,
    Initial: DataTypes.STRING,
    Levelling: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  OrganizationLevel.associate = function (models) {
    // associations can be defined here
  };
  return OrganizationLevel;
};