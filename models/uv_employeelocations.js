"use strict";
module.exports = (sequelize, DataTypes) => {
  const uv_EmployeeLocations = sequelize.define(
    "uv_EmployeeLocations",
    {
      Id: DataTypes.NUMBER,
      RowStatus: DataTypes.NUMBER,
      Username: DataTypes.STRING,
      EmployeeID: DataTypes.NUMBER,
      LocationID: DataTypes.NUMBER,
      LocationName: DataTypes.STRING,
      Long: DataTypes.STRING,
      Lat: DataTypes.STRING,
      Radius: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  uv_EmployeeLocations.associate = function(models) {
    // associations can be defined here
  };
  return uv_EmployeeLocations;
};
