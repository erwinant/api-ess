'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cuti = sequelize.define('Cuti', {
        Id: {
            primaryKey: true,
            type: DataTypes.STRING,
            autoIncrement: true
        },
        RowStatus: DataTypes.NUMBER,
        DocNo: DataTypes.STRING,
        Type: DataTypes.STRING,
        TanggalAwal: DataTypes.STRING,
        TanggalAkhir: DataTypes.STRING,
        Notes: DataTypes.STRING,
        EmployeeID: DataTypes.NUMBER,
        Status: DataTypes.STRING,
        TotalCuti: DataTypes.NUMBER,
        CreateDate: DataTypes.STRING,
        CreateBy: DataTypes.STRING,
        UpdateDate: DataTypes.STRING,
        UpdateBy: DataTypes.STRING,
        ApprStatus:DataTypes.STRING,
        ApprStep:DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Cuti.associate = function (models) {
        // associations can be defined here
        Cuti.belongsTo(models.Employee, {
            foreignKey: 'EmployeeID',
            onDelete: 'CASCADE'
        });
        Cuti.belongsTo(models.MasterCuti, {
            foreignKey: 'Type',
            onDelete: 'CASCADE'
        });
    };
    return Cuti;
};