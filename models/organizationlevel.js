'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationLevel = sequelize.define('OrganizationLevel', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    Name: DataTypes.STRING,
    Initial: DataTypes.STRING,
    Levelling: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
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