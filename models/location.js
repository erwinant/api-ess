'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    LocationName: DataTypes.STRING,
    LocationAddress: DataTypes.STRING,
    Long: DataTypes.STRING,
    Lat: DataTypes.STRING,
    Radius: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Location.associate = function (models) {
    // associations can be defined here
  };
  return Location;
};