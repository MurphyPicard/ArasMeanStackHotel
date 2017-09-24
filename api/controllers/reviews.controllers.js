var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
// may need to review error handling

// get all reviews for one hotel
module.exports.reviewsGetAll = function(req, res){
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log("getting one hotel with ID of ", hotelId );

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
      if(err || !doc){
        console.log("Error finding reviews, reviews controller: ");
        res
          .status(500)
          .json({"message": "there was an error finding reviews"});
      }else{
        console.log("returned doc: ", doc);
        res
          .status(200)
          .json(doc.reviews);
      }//else
    });//exec
};//reviewsGetAll

// GET a single review for a particular hotel
module.exports.reviewsGetOne = function(req, res){
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      if(err || !hotel){
        console.log("Error finding review, reviews controller: ");
        res
          .status(500)
          .json({"message": "there was an error finding this review"});
      }
      else{
        console.log("returned hotel: ", hotel);
        var review = hotel.reviews.id(reviewId);
        res
          .status(200)
          .json(review);
      }

    });
};

//helper function
var _addReview = function(req, res, hotel){

  hotel.reviews.push({
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });

  hotel.save(function(err, hotelUpdated){
    if(err){
      res.status(500).json(err);
    }else{
      res.status(201).json(hotelUpdated);
    }
  });
};

module.exports.reviewsAddOne = function(req, res){
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log(" ", hotelId );

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
      var response = {
        status: 200,
        message: []
      }

      if(err){
        console.log("Error adding review");
        response.status = 500;
        response.message = err;
      }else if(!doc){
        console.log("returned doc: ", doc);
        response.status = 404;
        response.message = "not found"
      }

      if(doc){
        _addReview(req, res, doc);
      }else {
        res.status(response.status).json(response.message);
      }//else
    });//exec
};
