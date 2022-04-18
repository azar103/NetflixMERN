const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    scretOrKey: process.env.SECRET_TOKEN
}
const strategy = new JWTStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload._id).select('-password');
        if(user){
            return done(null, user);
        } else {
            return done(null, error);
        }
    } catch (error) {
        console.log({error});
    }
});

module.exports = (passport) => {
    passport.use(strategy);
}