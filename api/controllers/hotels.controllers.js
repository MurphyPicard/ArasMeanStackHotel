// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // a geoJSON point
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  var geoOptions = {
    spherical: true,
    maxDistance: 99000,
    num: 5
  }

  Hotel
    .geoNear(point, geoOptions, function(err, results, stats){
        console.log("this is geo results: ", results);
        console.log("this is geo stats: ", stats);
        res
          .status(200)
          .json(results);
    });
};

module.exports.hotelsGetAll = function(req,res){

  var start = 0, count = 3, maxCount = 10; // which hotel to start at and how many to show

  if(req.query && req.query.lat && req.query.lng){
    runGeoQuery(req,res);
    return;
  }

  (req.query.start) ? start = parseInt(req.query.start, 10) : start = 0 ;
  (req.query.count) ? count = parseInt(req.query.count, 10) : count = 5 ;

  if(isNaN(start) || isNaN(count) ){
    res
      .status(400)
      .json( {"message": "start and/or count must be numbers"} );
      return;
  }

  if(count > maxCount){
    res
      .status(400)
      .json({"message": "count limit of " + maxCount + " exceeded"});
      return;
  }

  Hotel
    .find()
    .skip(start)
    .limit(count)
    .exec(function(err, hotels){
      if(err){
        console.log("Error finding hotels, hotels controller: ");
        res
          .status(500)
          .json(err);
      }else{
        console.log("Found this many hotels: ", hotels.length);
        res.json(hotels);
      }
    });//exec
  // var db = dbconn.get();
  // var collection = db.collection('hotelCollection');
  // collection
  //   .find()
  //   .skip(start)
  //   .limit(count)
  //   .toArray(function(err, docs){
  //     console.log('found these hotels: ', docs);
  //     res
  //       .status(200)
  //       .json(docs);
  //   });
};

module.exports.hotelsGetOne = function(req,res){
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log("getting one hotel with ID of ", hotelId );

  Hotel
    .findById(hotelId)
    .exec(function(err, doc){
      var response = {status: 200, message: doc};
      if(err){
        console.log("Error finding hotel, hotels controller");
        response.status = 500;
        response.message = err;
      }else if(!doc){
        response.status = 404;
        response.message = {"message": "Hotel Id not found, hotels controller"};
      }

      // status and message set above
      res.status(response.status).json(response.message);

    });
};

// helper function to split photos and services array
var _splitArray = function(input){
  var output = [];
  ( input && (output.length > 0) ) ? output = input.split(';') : output = [];
  return output;
}

// ON lecture 23 09/20/17
module.exports.hotelsAddOne = function(req,res){
  Hotel
    .create({

      name: req.body.name,
      description: req.body.description,
      stars: parseInt(req.body.stars, 10),
      services: _splitArray(req.body.services),
      photos: _splitArray(req.body.photos),
      currency: req.body.currency,
      location: {
        address: req.body.address,
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }

    }, function(err, hotel){
      if(err){
        console.log("error creating hotel");
        res
          .status(404)
          .json(err);
      }
      else{
        console.log("hotel created: ", hotel);
        res
          .status(201)
          .json(hotel);
      }

    });//create

};
