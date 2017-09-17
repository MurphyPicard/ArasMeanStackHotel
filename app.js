var express = require('express');
var app = express();
var path = require('path');

app.set('port', 2222);

app.use('/css', function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/json', function(req,res){
  console.log("get the json");
  res.status(200).json({'jsonData':true});
});

app.get('/file', function(req,res){
  console.log("get the file");
  res
    .status(200)
    .sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), function(){
  var port = server.address().port;
  console.log('Listening on ... ' + port);
});
