'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enum = sequelize.define('Enum', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Code: DataTypes.STRING,
    Text: DataTypes.STRING,
    Value: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  Enum.associate = function (models) {
    // associations can be defined here
  };
  return Enum;
};