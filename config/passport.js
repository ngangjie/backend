
const jwtstrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const keys = require('./keys').secret;

const opts = {};
opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport =>{
    passport.use(
        new jwtstrategy(opts, (jwt_payload, done)=>{
            User.findById(jwt_payload._id).then(user=>{
                if(user) return done(null, user);
                return done(null, false);
            }).catch(err=>{
                console.log(err);
            });
        })
    )
};
