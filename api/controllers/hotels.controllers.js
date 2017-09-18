var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req,res){
  console.log("getting all hotels");
  console.log(req.query);

  var off = 0, cnt = 3;

  (req.query && req.query.off) ? off = parseInt(req.query.off, 10) : off = 0 ;
  (req.query && req.query.cnt) ? cnt = parseInt(req.query.cnt, 10) : cnt = 5 ;

  var returnData = hotelData.slice(off, off+cnt);

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
