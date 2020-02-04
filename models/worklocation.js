"use strict";
module.exports = (sequelize, DataTypes) => {
  const WorkLocation = sequelize.define(
    "WorkLocation",
    {
      Id: {
        primaryKey: true,
        type: DataTypes.STRING,
        autoIncrement: true
      },
      RowStatus: DataTypes.NUMBER,
      WorkLocationCode: DataTypes.STRING,
      WorkLocationName: DataTypes.STRING,
      WorkLocationType: DataTypes.STRING,
      WorkLocationAddress: DataTypes.STRING,
      WorkLocationPhone: DataTypes.STRING,
      Long: DataTypes.STRING,
      Lat: DataTypes.STRING,
      Radius: DataTypes.STRING,
      CreateDate: DataTypes.STRING,
      CreateBy: DataTypes.STRING,
      UpdateDate: DataTypes.STRING,
      UpdateBy: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  WorkLocation.associate = function(models) {
    // associations can be defined here
  };
  return WorkLocation;
};
