'use strict';
module.exports = (sequelize, DataTypes) => {
  const MasterCuti = sequelize.define('MasterCuti', {
    Id: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Type: DataTypes.STRING,
    Description: DataTypes.STRING,
    City: DataTypes.STRING,
    Quota: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  MasterCuti.associate = function (models) {
    // associations can be defined here
  };
  return MasterCuti;
};