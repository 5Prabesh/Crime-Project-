'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable("admins", {
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
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("admins");
    }
};

