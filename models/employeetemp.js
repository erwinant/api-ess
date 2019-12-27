'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeTemp = sequelize.define('EmployeeTemp', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeID:DataTypes.NUMBER,
    RowStatus: DataTypes.NUMBER,
    NRP: DataTypes.STRING,
    FullName: DataTypes.STRING,
    Gender: DataTypes.STRING,
    Marriage: DataTypes.STRING,
    Religion: DataTypes.STRING,
    BirthPlace: DataTypes.STRING,
    BirthDate: DataTypes.STRING,
    BloodType: DataTypes.STRING,
    NoKtp: DataTypes.STRING,
    NoKk: DataTypes.STRING,
    Nationality: DataTypes.STRING,
    NoNpwp: DataTypes.STRING,
    AddressKtp: DataTypes.STRING,
    AddressDomisile: DataTypes.STRING,
    AreaCodeKtp: DataTypes.STRING,
    AreaCodeDomisile: DataTypes.STRING,
    HomeStatus: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Handphone1: DataTypes.STRING,
    Handphone2: DataTypes.STRING,
    EmailPrivate: DataTypes.STRING,
    EmailOffice: DataTypes.STRING,
    Tall: DataTypes.STRING,
    Weight: DataTypes.STRING,
    ShirtSize: DataTypes.STRING,
    ShoesSize: DataTypes.STRING,
    FamilyTax: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING,
    DepartmentID: DataTypes.NUMBER,
    OrganizationLevelID: DataTypes.NUMBER,
    Photo: DataTypes.STRING,
    DepartmentID: DataTypes.NUMBER,
    OrganizationLevelID: DataTypes.NUMBER,
    LocationID: DataTypes.NUMBER,
    ClockIn:DataTypes.STRING,
    ClockOut:DataTypes.STRING,
    EmergencyContact:DataTypes.STRING,
    EmergencyCall1:DataTypes.STRING,
    EmergencyCall2:DataTypes.STRING,
    EmergencyEmail:DataTypes.STRING,
    EmergencyRelation:DataTypes.STRING,
    AnyChange: DataTypes.STRING,
    DirectReportID: DataTypes.NUMBER,
    DivisionID: DataTypes.NUMBER,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  EmployeeTemp.associate = function (models) {
    // associations can be defined here
    EmployeeTemp.belongsTo(models.Employee, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
  };
  return EmployeeTemp;
};