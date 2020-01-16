'use strict';
module.exports = (sequelize, DataTypes) => {
  const MasterHoliday = sequelize.define('MasterHoliday', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Holidate: DataTypes.STRING,
    Description: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  MasterHoliday.associate = function (models) {
    // associations can be defined here
  };
  return MasterHoliday;
};