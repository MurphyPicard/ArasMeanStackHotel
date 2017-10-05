var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res){
  console.log('registering user');

  var username = req.body.username;
  var name = req.body.name || null;
  var password = req.body.password;

  User.create({
    username: username,
    name: name,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user){
    if (err){
      console.log("this is the error: ", err);
      res.status(400).json(err);
    }
    else {
      console.log('user created: ', user);
      res.status(201).json(user);
    }//else
  });//create
};//register

module.exports.login = function(req, res){
  console.log('logging in user');

  var username = req.body.username; // set to unique in userSchema
  var password = req.body.password;

  User.findOne({
    username: username
  }).exec(function(err, user){
    if (err) {
      console.log("this is the error: ", err);
      res.status(400).json(err);
    }
    else {
      if(bcrypt.compareSync(password, user.password)){
        console.log('user found: ', user);
        // token can be seen on postman users/login - tokens have a header, a payload and a signature
        // will use this token in other requests against other secure endpoints
        var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 9999})
        res.status(200).json({success: true, token: token});
      }
      else{
        res.status(401).json("Unauthorized");
      }

    }//else
  });//exec
};//login


//asdf
module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if(headerExists){
    var token = req.headers.authorization.split(' ')[1]; // authorization bearer xxx
    jwt.verify(token, 's3cr3t', function(error, decoded){
      if(error){
        console.log(error);
        res.status(401).json("Unauthorized");
      }
      else{
        req.user = decoded.username;
        next();
      }
    });//verify
  }//if
  else{
    res.status(403).json('no token provided');
  }
};//authenticate
