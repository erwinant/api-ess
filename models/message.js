'use strict';
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        Id: {
            primaryKey: true,
            type: DataTypes.STRING,
            autoIncrement: true
        },
        RowStatus: DataTypes.NUMBER,
        Sender: DataTypes.NUMBER,
        Subject: DataTypes.STRING,
        Message: DataTypes.STRING,
        CreateDate: DataTypes.STRING,
        CreateBy: DataTypes.STRING,
        UpdateDate: DataTypes.STRING,
        UpdateBy: DataTypes.STRING,
        Receiver: DataTypes.NUMBER,
        ReadIt: DataTypes.NUMBER,
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    Message.associate = function (models) {
        // associations can be defined here
        Message.belongsTo(models.Employee, {
            foreignKey: 'Sender',
            onDelete: 'CASCADE'
        });
    };
    return Message;
};