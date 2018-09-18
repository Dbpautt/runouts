require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const authMiddlewares = require('./middlewares/auth');
const flash = require('connect-flash');

require('./handlebarsjs/helpers');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

const app = express();
// @review The then and catch do ... what here?
mongoose.connect(process.env.MONGODB_URI)
.then()
.catch();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'runouts',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  app.locals.currentUser = req.session.currentUser;
  app.locals.infoNotifications = req.flash('info');
  app.locals.errorNotifications = req.flash('error');
  next();
});

app.use('/auth', authRouter);

app.use('/', indexRouter);
app.use('/users', authMiddlewares.requireUser, usersRouter);
app.use('/groups', authMiddlewares.requireUser, groupsRouter);
app.use('/profile', authMiddlewares.requireUser, profileRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
