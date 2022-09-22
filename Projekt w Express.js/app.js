var createError = require('http-errors');
var express = require('express');     //obiekt express pobrany z biblioteki express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Definicje kontrolerów funkcjonalnych z kartoteki routes !important
var usersRouter = require('./routes/users');
var databaseRouter = require('./routes/database')


var app = express();  //nasza aplikacja w express, obiekt app za pomocą metody express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  //według zasad ejs generujemy widok

app.use(logger('dev'));     //komunikaty debugujące
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //wszystko co musi zostać pobrane do przeglądarki - kartoteka public

// Powiązanie kontrolerów ze ścieżkami adresów URL
app.use('/', databaseRouter);
app.use('/users', usersRouter);


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
