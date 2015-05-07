/**
 * Created by john.nana on 12/19/2014.
 */
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("../models/User"),
    config = require("../config");

module.exports = function (app) {
     passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });

    });


    // passport/login.js
    passport.use(new LocalStrategy(
        function(username, password, done) {

            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user && user.isValidPassword(password))return done(null,user);
                if (user && !user.isValidPassword(password))return done(err, false, { message: 'Incorrect password.' });


            });

        }
    ));
}; //end function
