const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const path = require('path');
const compression = require('compression');
const session = require('express-session');
let SequelizeStore = require('connect-session-sequelize')(session.Store);
const bodyParser = require('body-parser');
const {sequelize} = require("./models");
const {APIPREFIX} = require("./constants");
const cors = require('cors');

function createServer(){
    const app = express();
    
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(express.static(path.join(__dirname, '../public')));
    require('./config/passport')(passport);
    
    app.use(fileUpload());
    const sequelizeSessionStore = new SequelizeStore({
        db:sequelize
    });
    app.use(session({
        store: sequelizeSessionStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(APIPREFIX, require('./routes'));
    return app;    
    };

module.exports =  createServer;
