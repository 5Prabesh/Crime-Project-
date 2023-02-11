'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable("categories", {
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
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("categories");
    }
};
