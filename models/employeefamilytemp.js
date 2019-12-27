'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeFamilyTemp = sequelize.define('EmployeeFamilyTemp', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    FullName: DataTypes.STRING,
    Relation: DataTypes.STRING,
    BirthPlace: DataTypes.STRING,
    BirthDate: DataTypes.STRING,
    BloodType: DataTypes.STRING,
    Gender: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING,
    BirthDate:  {
      type : DataTypes.STRING,
      get(){
        const moment = require('moment');
        let BirthDate = this.getDataValue('BirthDate') ? moment(this.getDataValue('BirthDate')).format('YYYY-MM-DD'):"";
        return BirthDate.split('T')[0];
      },
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  EmployeeFamilyTemp.associate = function (models) {
    // associations can be defined here
    EmployeeFamilyTemp.belongsTo(models.Employee, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
    });
  };
  return EmployeeFamilyTemp;
};