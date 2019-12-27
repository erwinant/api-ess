'use strict';
module.exports = (sequelize, DataTypes) => {
  const MasterClaim = sequelize.define('MasterClaim', {
    Id: {
      primaryKey: true,
      type: DataTypes.STRING,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Type: DataTypes.STRING,
    Description: DataTypes.STRING,
    Amount: DataTypes.NUMBER,
    ValidFrom: {
      type : DataTypes.STRING,
      get(){
        const moment = require('moment');
        let ValidFrom = this.getDataValue('ValidFrom') ? moment(this.getDataValue('ValidFrom')).format('YYYY-MM-DD'):"";
        return ValidFrom.split('T')[0];
      },
      // set(val) {
      //   console.log(val);
      //   this.setDataValue('ValidFrom', val.toUpperCase());
      // }
    },
    ValidTo: {
      type : DataTypes.STRING,
      get(){
        const moment = require('moment');
        let ValidTo = this.getDataValue('ValidTo') ? moment(this.getDataValue('ValidTo')).format('YYYY-MM-DD'):"";
        return ValidTo.split('T')[0];
      },
      // set(val) {
      //   console.log(val);
      //   this.setDataValue('ValidTo', val.toUpperCase());
      // }
    },
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  MasterClaim.associate = function (models) {
    // associations can be defined here
  };
  return MasterClaim;
};