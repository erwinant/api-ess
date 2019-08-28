'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.NUMBER,
    LocationName: DataTypes.STRING,
    LocationAddress: DataTypes.STRING,
    Long: DataTypes.NUMBER,
    Lat: DataTypes.NUMBER,
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
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