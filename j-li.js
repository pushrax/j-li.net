var express = require('express');

var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use('/', express.static(__dirname + '/public'));

  app.locals.year = new Date().getFullYear();
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('./routes.js')(app);


var addr = process.env.PORT || 3000;

app.listen(addr, function() {
  console.log("Listening on %d in %s mode", addr, app.settings.env);  
});
