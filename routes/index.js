var express = require('express');
var router = express.Router();



router
  .route('/json')
  .get(function(req,res){
    console.log("get the json now");
    res.status(200).json({'jsonData':true});
  })
  .post(function(req,res){
    console.log("post the json route");
    res.status(200).json({'jsonData':'post is changed'});
  });







module.exports = router;
