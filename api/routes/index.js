var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

// hotel routes
router
  .route('/hotels')
  .get(ctrlUsers.authenticate, ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne)
  .delete(ctrlHotels.hotelsDeleteOne);


// review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

// Authentication related routes
router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);


/*

update a specific hotel
PUT
/api/hotels/234

delete a specific hotel
DELETE
/api/hotels/234

GET - get all reviews for a specific hotel
/api/hotels/23/reviews

POST - add a review
/api/hotels/23/reviews

GET - see one review
/api/hotels/23/reviews/324234

PUT - update one review
/api/hotels/23/reviews/242342

DELETE one review
/api/hotels/23/reviews/123

*/

module.exports = router;
