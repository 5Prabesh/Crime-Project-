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
        userId: {type: DataTypes.INTEGER, allowNull: true},
        categoryId: {type: DataTypes.INTEGER, allowNull: true},
        fullName: {type: DataTypes.STRING, allowNull: true},
        phoneNumber: {type: DataTypes.STRING, allowNull: true},
        email: {type: DataTypes.STRING, allowNull: true},
        crimeSpot: {type: DataTypes.STRING, allowNull: true},
        street: {type: DataTypes.STRING, allowNull: true},
        postalCode: {type: DataTypes.STRING, allowNull: true},
        city: {type: DataTypes.STRING, allowNull: true},
        description: {type: DataTypes.TEXT, allowNull: true},
        status: { 
            type:DataTypes.ENUM,
            values: ["pending", "accepted", "rejected"],
            defaultValue: "pending"
        },
        remarks: {type: DataTypes.TEXT, allowNull: true},
        evidence: {type: DataTypes.STRING, allowNull: true},
        createdAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        updatedAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        deletedAt :{type: DataTypes.DATE,allowNull:true}
    };
    let modelOptions = {
        tableName: "reports",
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        paranoid: true,
        deletedAt: 'deletedAt'
    };
    const reports = sequelize.define('reports', modelDefinition, modelOptions);
    reports.associate = (models) => {
        reports.belongsTo(models.users, { foreignKey : "userId" });
        reports.belongsTo(models.categories, { foreignKey : "categoryId" });
    }
    sequelizePaginate.paginate(reports);
    return reports;
};
