const LocalStrategy = require('passport-local').Strategy;
const { admins, users } = require('../models');



module.exports = (passport) => {

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(async(email, password, done) => {

        let userResp = await admins.findOne({ where: { 'email': email } });
        if (!userResp) {
            return done(null, false, { message: 'Account does not exist.' });
        }

        if (! await userResp.validPassword(password)) {
            return done(null, false, { message: 'Username and Password do not match.' });
        }
        return done(null, userResp);

   
    }));


    

    passport.use('local-login', new LocalStrategy(async(email, password, done) => {

        let user = await users.findOne({ where: { 'email': email } });
          
        if (!user) {
            return done(null, false, { message: 'Account does not exist.' });
        }
        if (! await user.validPassword(password)) {
            return done(null, false, { message: 'Username and Password do not match.' });
        }
        return done(null, user);
    }));
};
