'use strict';
module.exports = (sequelize, DataTypes) => {
  const Division = sequelize.define('Division', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    Name: DataTypes.STRING,
    Initial: DataTypes.STRING,
    CostCenterCode: DataTypes.STRING,
    Location: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Division.associate = function (models) {
    // associations can be defined here
  };
  return Division;
};