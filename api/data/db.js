var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/hotelData';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
  console.log('Ara log - Mongoose is connected on: ' + dburl);
});

mongoose.connection.on('disconnected', function(){
  console.log('Ara log - Mongoose is disconnected');
});

mongoose.connection.on('error', function(err){
  console.log('Ara log - mongoose connection error: ' + err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Ara, mongoose disconnected through app termination');
    process.exit(0)
  })
})
