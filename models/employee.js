'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    Id: DataTypes.NUMBER,
    RowStatus: DataTypes.NUMBER,
    NRP: DataTypes.STRING,
    FullName: DataTypes.STRING,
    Gender: DataTypes.STRING,
    Marriage: DataTypes.STRING,
    Religion: DataTypes.STRING,
    BirthPlace: DataTypes.STRING,
    BirthDate: DataTypes.DATE,
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
    CreateDate: DataTypes.DATE,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};