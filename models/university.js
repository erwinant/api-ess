'use strict';
module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define('University', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    University: DataTypes.STRING,
    Akreditasi: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  University.associate = function (models) {
    // associations can be defined here
  };
  return University;
};