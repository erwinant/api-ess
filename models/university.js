'use strict';
module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define('University', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    University: DataTypes.STRING,
    Akreditasi: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
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