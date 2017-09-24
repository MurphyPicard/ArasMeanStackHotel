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
    console.log('Ara, mongoose disconnected through app termination (SIGINT)');
    process.kill(process.pid, 'SIGINT');
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log('Ara, disconnected through via SIGTERM');
    process.kill(process.pid, 'SIGTERM');
    process.exit(0);
  });
});

process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log('Ara, disconnected through via SIGUSR2');
    process.kill(process.pid, 'SIGUSR2');
  });
});
