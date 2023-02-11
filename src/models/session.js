"use strict";

module.exports = (sequelize, DataTypes) => {
    let modelDefinition = {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        expires: {
            type: DataTypes.DATE
        },
        data: {
            type: DataTypes.STRING(50000)
        } ,
        createdAt: {
            type: DataTypes.DATE
        } ,
        updatedAt: {
            type: DataTypes.DATE
        }
    };
    let modelOptions = {
        tableName: "Sessions"
    };

    return  sequelize.define('Sessions', modelDefinition,modelOptions);

};
