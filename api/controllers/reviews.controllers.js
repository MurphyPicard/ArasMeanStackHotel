var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// get all reviews for one hotel
module.exports.reviewsGetAll = function(req, res){
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log("getting one hotel with ID of ", hotelId );

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
      console.log("returned doc: ", doc);
      res
        .status(200)
        .json(doc.reviews);
    });
};

// GET a single review for a particular hotel
module.exports.reviewsGetOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      console.log("returned hotel: ", hotel);
      var review = hotel.reviews.id(reviewId);
      res
        .status(200)
        .json(review);
    });
};