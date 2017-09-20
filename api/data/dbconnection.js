var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/hotelData';

var _connection = null;


var open = function(){
  // set _connection
  MongoClient.connect(dburl, function(err, db){
    if(err){
      console.log("db connection failed");
      return
    }else{
      _connection = db;
      console.log("db connection open!!! ", db);
    }
  });
};

var get = function(){
  return _connection;
};

module.exports = {
  open: open,
  get: get
}
