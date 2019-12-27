'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spd = sequelize.define('Spd', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    TanggalAwal: DataTypes.STRING,
    TanggalAkhir: DataTypes.STRING,
    Tujuan: DataTypes.STRING,
    Notes: DataTypes.STRING,
    Akomodasi: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING,
    EmployeeID:DataTypes.NUMBER,
    ApprStatus:DataTypes.STRING,
    ApprStep:DataTypes.STRING,
    SpdNo:DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Spd.associate = function (models) {
    // associations can be defined here
    Spd.belongsTo(models.Employee, {
      foreignKey: 'EmployeeID',
      onDelete: 'CASCADE'
  });
  };
  return Spd;
};