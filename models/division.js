'use strict';
module.exports = (sequelize, DataTypes) => {
  const Division = sequelize.define('Division', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Name: DataTypes.STRING,
    Initial: DataTypes.STRING,
    Location: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Division.associate = function (models) {
    // associations can be defined here
    Division.hasMany(models.Department, {
      foreignKey: 'DivisionID',
      onDelete: 'CASCADE'
    });
  };
  return Division;
};