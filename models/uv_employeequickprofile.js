'use strict';
module.exports = (sequelize, DataTypes) => {
  const uv_EmployeeQuickProfile = sequelize.define('uv_EmployeeQuickProfile', {
    AccountID: DataTypes.NUMBER,
    EmployeeID: DataTypes.NUMBER,
    Username: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    FullName: DataTypes.STRING,
    LevelName: DataTypes.STRING,
    LevelNumber: DataTypes.STRING,
    DepartmentName: DataTypes.STRING,
    DivisionName: DataTypes.STRING,
    DivisionID: DataTypes.NUMBER,
    DepartmentID: DataTypes.NUMBER,
    Photo: DataTypes.STRING,
    LocationID: DataTypes.NUMBER,
    Long: DataTypes.STRING,
    Lat: DataTypes.STRING,
    Radius: DataTypes.STRING,
    LocationName: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  uv_EmployeeQuickProfile.associate = function(models) {
    // associations can be defined here
  };
  return uv_EmployeeQuickProfile;
};