const dotenv = require('dotenv');
dotenv.config();

let config = {
    nodeEnv : process.env.ENV_NODE || 'development',
    port : process.env.PORT || 5555
};

module.exports = config;
