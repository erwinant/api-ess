'use strict';
module.exports = (sequelize, DataTypes) => {
  const uv_cronAbsen = sequelize.define('uv_cronAbsen', {
    Id: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    FullName: DataTypes.STRING,
    AbsentDate: DataTypes.STRING,
    ClockIn: DataTypes.STRING,
    ClockOut: DataTypes.STRING,
    LongIn: DataTypes.STRING,
    LatIn: DataTypes.STRING,
    LongOut: DataTypes.STRING,
    LatOut: DataTypes.STRING,
    DirectReportID: DataTypes.STRING,
    EmailOffice: DataTypes.STRING,
    AbsCheck: DataTypes.STRING,
    EmailOfficeAtasan:DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  uv_cronAbsen.associate = function(models) {
    // associations can be defined here
  };
  return uv_cronAbsen;
};