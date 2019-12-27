'use strict';
module.exports = (sequelize, DataTypes) => {
    const Claim = sequelize.define('Claim', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RowStatus: DataTypes.NUMBER,
        ClaimNo: DataTypes.STRING,
        ClaimType: DataTypes.NUMBER,
        ClaimDate: DataTypes.STRING,
        EmployeeID: DataTypes.NUMBER,
        Recipient: DataTypes.STRING,
        Relation: DataTypes.STRING,
        Nominal: DataTypes.NUMBER,
        Notes: DataTypes.STRING,
        ClaimStatus: DataTypes.STRING,
        CreateDate: DataTypes.STRING,
        CreateBy: DataTypes.STRING,
        UpdateDate: DataTypes.STRING,
        UpdateBy: DataTypes.STRING,
        
        ApprStatus: DataTypes.STRING,
        ApprStep: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Claim.associate = function (models) {
        // associations can be defined here
        Claim.belongsTo(models.Employee, {
            foreignKey: 'EmployeeID',
            onDelete: 'CASCADE'
        });
        Claim.belongsTo(models.MasterClaim, {
            foreignKey: 'ClaimType',
            onDelete: 'CASCADE'
        });
    };
    return Claim;
};