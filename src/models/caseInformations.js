'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    let modelDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {type: DataTypes.STRING, allowNull: true},
        description: {type: DataTypes.TEXT, allowNull: true},
        createdAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        updatedAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        deletedAt :{type: DataTypes.DATE,allowNull:true}
    };
    let modelOptions = {
        tableName: "case_informations",
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    };
    const caseInformations = sequelize.define('caseInformations', modelDefinition, modelOptions);
    sequelizePaginate.paginate(caseInformations);
    return caseInformations;
};
