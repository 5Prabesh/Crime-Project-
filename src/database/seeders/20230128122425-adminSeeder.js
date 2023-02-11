'use strict';
const {admins} = require('../../models');

module.exports = {
    up: async () => {
        let adminData = {
            'firstName': "Super",
            'lastName': "Admin",
            'email': "superadmin@gmail.com",
            'username': 'superadmin',
            'password': "123Admin@",
            'phoneNumber': '9745373910',
        };
        const superAdmindata = await admins.findOne({where:{
            username:'superadmin'
        }});

        if(superAdmindata === null){
            await admins.create(adminData);
        }
    },

    down: async () => {
        return true;
    }
};

