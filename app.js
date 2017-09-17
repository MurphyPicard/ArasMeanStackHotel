var express = require('express');
var app = express();

app.set('port', 2222);

app.get('/', function(req,res){
  console.log("get the homepage");
  res.status(404).send('hi');
});

app.get('/json', function(req,res){
  console.log("get the json");
  res.status(200).json({'data':true});
});

var server = app.listen(app.get('port'), function(){
  var port = server.address().port;
  console.log('Listening on ... ' + port);
});
