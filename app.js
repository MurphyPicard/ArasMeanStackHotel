require('./api/data/dbconnection.js').open();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); // between path and routes

var routes = require('./api/routes');

app.set('port', 2222);

app.use('/css', function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// don't need to run bodyParser on static paths
app.use(bodyParser.urlencoded({ extended: false })); // false means we only need strings and arrays in our form

app.use('/api', routes);



var server = app.listen(app.get('port'), function(){
  var port = server.address().port;
  console.log('Listening on ... ' + port);
});
