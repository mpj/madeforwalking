
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var connect = require('connect')
  //, Db = require('mongodb').Db
  //, Server = require('mongodb').Server
  //, server_config = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true})
  //, db = new Db('test', server_config, {})
//  , mongoStore = require('connect-mongodb');

var app = module.exports = express.createServer(

);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());

  // Session support
  app.use(connect.cookieParser('session secret hooray'));
  //app.use(connect.session({ store: new mongoStore({db: db}) }));
  app.use(connect.session());

  app.use(express.methodOverride());
  app.use(app.router);
 

  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/weight', routes.weight);
app.get('/steps', routes.steps);
app.get('/calories', routes.calories);
app.get('/login', routes.login);
app.get('/report', routes.report);

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

process.on('uncaughtException', function (err) {
  console.log("Unhandled exception:\n", err.stack);
});