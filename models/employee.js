'use strict';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
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
    JoinDate:DataTypes.STRING,
    ContractPeriode:DataTypes.STRING,
    EmployeeStatus:DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  Employee.associate = function (models) {
    Employee.hasMany(models.EmployeeEdu, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeEduTemp, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeFamily, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeFamilyTemp, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeAttachment, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeAttachmentTemp, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeTraining, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeTrainingTemp, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.hasMany(models.EmployeeTemp, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
    Employee.belongsTo(models.Employee, {
      as: 'Boss',
      foreignKey: 'DirectReportID',
      onDelete: 'CASCADE'
    });
  };
  return Employee;
};