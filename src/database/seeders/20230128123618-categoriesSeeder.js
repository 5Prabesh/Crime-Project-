'use strict';
const sequelize = require("sequelize");
const { categories } = require("../../models");

module.exports = {
    up: async (queryInterface) => {

        const checkCategory = async title => categories.count({
            where: {
                'title': sequelize.where(sequelize.fn('lower', sequelize.col('title')), title)
            }
        });


        let insertArray = [];
        let categoriesArray = [
            {
                title: 'Antisocial behaviour',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
              title: 'Arson',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Burglary',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Childhood abuse',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {  
              title: 'Crime abroad',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Cybercrime and online fraud',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Domestic abuse',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Fraud',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Hate crime',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Modern slavery',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Murder or manslaughter',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Rape and sexual assault',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Robbery',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Sexual harassment',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Stalking',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Terrorism',
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              title: 'Violent crime',
              createdAt: new Date(),
              updatedAt: new Date()
            },
        ];

        for (const category of categoriesArray) {
            const check = await checkCategory(category?.['title']?.toLowerCase()?.trim());
            if (check === 0) {
                insertArray.push(category);
            }
        }

        if (insertArray.length > 0) {
            await queryInterface.bulkInsert('categories', insertArray);
        }
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('categories');
    }
};
