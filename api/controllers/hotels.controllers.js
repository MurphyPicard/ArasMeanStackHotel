var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req,res){
  console.log("get hotel-data.json success?");
  res
    .status(200)
    .json(hotelData);
};

module.exports.hotelsGetOne = function(req,res){
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log("get one hotel-data.json success?");
  res
    .status(200)
    .json(hotelData[hotelId]); // using the params to pick a specific hotel
};
