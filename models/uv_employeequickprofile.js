'use strict';
module.exports = (sequelize, DataTypes) => {
  const uv_EmployeeQuickProfile = sequelize.define('uv_EmployeeQuickProfile', {
    RowStatus: DataTypes.NUMBER,
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
    LocationName: DataTypes.STRING,
    Gender: DataTypes.STRING,
    ClockIn: DataTypes.STRING,
    ClockOut: DataTypes.STRING,
    EmailPrivate: DataTypes.STRING,
    OrganizationLevelID: DataTypes.NUMBER,
    DirectReportID: DataTypes.NUMBER,
    Role: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  uv_EmployeeQuickProfile.associate = function(models) {
    // associations can be defined here
  };
  return uv_EmployeeQuickProfile;
};