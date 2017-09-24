var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');



router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);
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
