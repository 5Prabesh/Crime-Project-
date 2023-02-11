require("dotenv").config();
const connectUrl = process.env.DBCONFIG;
const Sequelize = require('sequelize'), postgres = new Sequelize(connectUrl, {
    logging: false,
    dialect: 'postgres',
    connectionTimeout: 0,
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000
    }
});
postgres.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = {postgres};
