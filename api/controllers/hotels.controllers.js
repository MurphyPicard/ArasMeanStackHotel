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

  var start = 0, count = 3; // which hotel to start at and how many to show
  if(req.query && req.query.lat && req.query.lng){
    runGeoQuery(req,res);
    return;
  }

  (req.query.start) ? start = parseInt(req.query.start, 10) : start = 0 ;
  (req.query.count) ? count = parseInt(req.query.count, 10) : count = 5 ;

  Hotel
    .find()
    .skip(start)
    .limit(count)
    .exec(function(err, hotels){
      console.log("Found this many hotels: ", hotels.length);
      res.json(hotels);
    });
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
  // var db = dbconn.get();
  // var collection = db.collection('hotelCollection');
  var hotelId = req.params.hotelId; // I named this route in index.js
  console.log("getting one hotel with ID of ", hotelId );

  Hotel
    .findById(hotelId)
    .exec(function(err, doc){
      res
        .status(200)
        .json(doc);
    });
    // .findOne( { _id : ObjectId(hotelId) } , function(err, doc){
    //   res
    //     .status(200)
    //     .json(doc);
    // });
};

// ON lecture 23 09/20/17
module.exports.hotelsAddOne = function(req,res){
  var db = dbconn.get();
  var collection = db.collection('hotelCollection');
  var newHotel;
  console.log('posting new hotel');

  if(req.body && req.body.name && req.body.stars){
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);

    console.log("this is new hotel line 51ish: ", newHotel );
    collection.insertOne(newHotel, function(err, response){
      console.log("response line 53: ",response);
      console.log("response.ops line 54: ", response.ops);

      res
        .status(201)
        .json(response.ops);
    });
  }//if
  else{
    console.log("Data is missing from body");
    res.status(400)
       .json( {message: "required data is missing from body"});
  }

};
