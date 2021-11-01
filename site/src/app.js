//configuracion de variable de entorno

require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var session = require('express-session');
var cookieParser = require('cookie-parser');


const cookieCheck = require('./middlewares/cookieCheck');
const localsUserCheck = require('./middlewares/localUserCheck');

var indexRouter = require('./routes/indexRoute');
var usersRouter = require('./routes/usersRoute');
var productsRouter = require("./routes/productsRoute");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));



app.use(session({
  secret : "Leaf",
  resave : false,
  saveUninitialized : false,
}));


app.use(cookieCheck);
app.use(localsUserCheck);


app.use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products", productsRouter);
//api users
app.use('/api/users', require('./routes/api/usersRouter'));
//api carts
app.use('/api/carts', require('./routes/api/cartRouter'));
//api provincias
app.use('/api/provincias', require('./routes/api/provinciaRouter'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
