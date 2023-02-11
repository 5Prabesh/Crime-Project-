'use strict';
const sequelizePaginate = require('sequelize-paginate');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    let modelDefinition = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {type: DataTypes.STRING, defaultValue: ''},
        lastName: {type: DataTypes.STRING, defaultValue: ''},
        email: {type: DataTypes.STRING, unique: true, index: true},
        username: {type: DataTypes.STRING, index: true},
        password: {type: DataTypes.STRING},
        phoneNumber: {type: DataTypes.STRING},
        createdAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        updatedAt: {type: DataTypes.DATE, defaultValue: Date.now()},
        deletedAt :{type: DataTypes.DATE,allowNull:true}
    };
    let modelOptions = {
        tableName: "admins",
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        paranoid: true,
        deletedAt: 'deletedAt',
        hooks: {
            beforeSave: (admin) => {
                if(admin.password) {
                    const salt = bcrypt.genSaltSync(10, 'a');
                    admin.password = bcrypt.hashSync(admin.password, salt);
                }
            } 
        }
    };
    const admins = sequelize.define('admins', modelDefinition, modelOptions);
    sequelizePaginate.paginate(admins);
    return admins;
};
