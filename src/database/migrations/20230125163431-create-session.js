'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Sessions',
            {
                sid: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                expires: {
                    type: DataTypes.DATE
                },
                data: {
                    type: DataTypes.STRING(50000)
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                }
            }
        );
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Sessions');
    }
};

