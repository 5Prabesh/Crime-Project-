'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        return queryInterface.createTable(
            "users",
            {
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
            }
        );
    },

    async down(queryInterface) {
        return queryInterface.dropTable("users");
    }
};

