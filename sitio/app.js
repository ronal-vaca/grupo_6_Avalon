var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var carritoRouter = require('./routes/carrito'); //agus
var registroRouter = require('./routes/registro');//emi
var iniciarsesionRouter = require('./routes/iniciarsesion');//emi
var productosRouter = require('./routes/productos');//emi

var detalleProductoRouter = require('./routes/detalleProducto'); //ronal

var cargaProductoRouter= require('./routes/productAdd');//lusho

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/carrito', carritoRouter); //agus
app.use('/registro', registroRouter);  //emi
app.use('/iniciarsesion', iniciarsesionRouter);//emi
app.use('/productos', productosRouter); //emi

app.use('/detalleProducto', detalleProductoRouter);//ronal

app.use('/cargaProducto',cargaProductoRouter);//lusho


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
