var express = require('express');
var app = express();

app.set('port', 2222);

app.listen(app.get('port'), function(){
  console.log('Listening on ... ' + app.get('port'));
});
