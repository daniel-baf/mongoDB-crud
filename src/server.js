require('dotenv').config();

const express        = require('express');
const exphbs         = require('express-handlebars');
const path           = require('path');
const morgan         = require('morgan');
const methodOverride = require('method-override'); // enable PUT AND DELETE from html form
const flash          = require('connect-flash');
const session        = require('express-session');
const passport       = require('passport');

// initializations
const app = express();
require('./config/passport');


// settings
app.set('port', process.env.PORT || 4000); // default por for enviroment, otherwise, 4000
app.set('views', path.join(__dirname, 'views'));
// templates engine configuration
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev')); // server pings output 
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Aguacate123.', // secret key
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// GLobal variables
// create a global variable for success messages on request var.
app.use((req, res, next) => { 
    res.locals.success_msg  = req.flash('success_msg'); 
    res.locals.error_msg    = req.flash('error_msg');
    res.locals.error        = req.flash('error'); 
    res.locals.user         = req.user || null;
    next();}
);

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;