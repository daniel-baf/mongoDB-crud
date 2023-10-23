const usersCtrl = {};
const User      = require('../models/User');
const passport  = require('passport'); 

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('auth/signup');
};

usersCtrl.signup = async (req, res) => {
    // retrieve data
    const errors = []; // array of possible errors
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Password missmathc' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        redirectWithErrors(res, 'auth/signup', errors, name, email);
        return;
    }
    // valid regist
    // search for found user
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
        errors.push({ text: 'Email already in use' });
        redirectWithErrors(res, 'auth/signup', errors, name, email);
        return;
    }
    // valid insert
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Account created, login now');
    res.redirect('/auth/signin');

}

usersCtrl.renderSignInForm = (req, res) => {
    res.render('auth/signin');
}

usersCtrl.signin = passport.authenticate('login', {
    failureRedirect: '/auth/signin',
    successRedirect: '/notes/',
    failureFlash: true
});

usersCtrl.logout = (req, res) => { 
    req.logout( (err) => {
        if (err) { return next(err); }
        req.flash( "success_msg" , "Session closed" );
        res.redirect( "/auth/signin" );
    });
}

function redirectWithErrors(res, path, errors, name, email) {
    res.render(path, { errors, name, email });
}

module.exports = usersCtrl;