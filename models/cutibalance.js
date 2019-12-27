'use strict';
module.exports = (sequelize, DataTypes) => {
    const CutiBalance = sequelize.define('CutiBalance', {
        Id: {
            primaryKey: true,
            type: DataTypes.STRING,
            autoIncrement: true
        },
        RowStatus: DataTypes.NUMBER,
        Type: DataTypes.STRING,
        PeriodeAwal: DataTypes.STRING,
        PeriodeAkhir: DataTypes.STRING,
        Balance: DataTypes.NUMBER,
        EmployeeID: DataTypes.NUMBER,
        CreateDate: DataTypes.STRING,
        CreateBy: DataTypes.STRING,
        UpdateDate: DataTypes.STRING,
        UpdateBy: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    CutiBalance.associate = function (models) {
        // associations can be defined here
        // associations can be defined here
        CutiBalance.belongsTo(models.Employee, {
            foreignKey: 'EmployeeID',
            onDelete: 'CASCADE'
        });
    };
    return CutiBalance;
};