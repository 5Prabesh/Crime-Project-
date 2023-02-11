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
        createdAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        updatedAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        deletedAt :{type: DataTypes.DATE,allowNull:true}
    };
    let modelOptions = {
        tableName: "categories",
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        paranoid: true,
        deletedAt: 'deletedAt'
    };
    const categories = sequelize.define('categories', modelDefinition, modelOptions);
    sequelizePaginate.paginate(categories);
    return categories;
};
