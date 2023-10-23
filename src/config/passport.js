const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User');

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    // Match email on DB ?
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Not user found' });
    }
    // check password matches
    const match = await user.matchPassword(password);
    if (!match) {
        return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user); // valid login
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {done(null, user)})
        .catch(err => {done(err, null)});
});