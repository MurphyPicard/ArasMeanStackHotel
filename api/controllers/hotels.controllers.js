var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req,res){
  console.log("get hotel-data.json success?");
  res
    .status(200)
    .json(hotelData);
};
