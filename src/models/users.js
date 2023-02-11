'use strict';
const sequelizePaginate = require('sequelize-paginate');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    let modelDefinition = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstName: { type: DataTypes.STRING, allowNull: true },
        lastName: { type: DataTypes.STRING, allowNull: true },
        username: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, unique:true, allowNull:true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: true},
        password: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING, allowNull: true},
        documentType: { type: DataTypes.STRING, allowNull: true},
        documentImage: { type: DataTypes.STRING, allowNull: true},
        deletedAt: { type: DataTypes.DATE, allowNull: true },
        createdAt: { type: DataTypes.DATE, defaultValue: Date.now() },
        updatedAt: { type: DataTypes.DATE, defaultValue: Date.now() }
    };
    let modelOptions = {
        tableName: "users",
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        paranoid: true,
        deletedAt: 'deletedAt',
        hooks: {
            beforeSave: (user) => {
                if(user.password) {
                    const salt = bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            } 
        }
    };
    const users = sequelize.define('users', modelDefinition, modelOptions);
    sequelizePaginate.paginate(users);
    return users;
};
