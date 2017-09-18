var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req,res){
  console.log("getting all hotels");
  console.log(req.query); // show json of the query object

  var start = 0, count = 3; // which hotel to start at and how many to show

  (req.query.start) ? start = parseInt(req.query.start, 10) : start = 0 ;
  (req.query.count) ? count = parseInt(req.query.count, 10) : count = 5 ;

  var returnData = hotelData.slice(start, start+count); // just a few of the many

  res
    .status(200)
    .json(returnData);
};

module.exports.hotelsGetOne = function(req,res){
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log("getting one hotel with ID of ", hotelId );
  res
    .status(200)
    .json(hotelData[hotelId]); // using the params to pick a specific hotel
};

module.exports.hotelsAddOne = function(req,res){
  console.log('posting new hotel');
  console.log(req.body);
  res
    .status(200)
    .json(req.body); 
};
