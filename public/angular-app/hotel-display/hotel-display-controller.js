angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController ($route, $routeParams, hotelDataFactory){
  var vm = this;
  var id = $routeParams.id;
  hotelDataFactory.hotelDisplay(id).then(function(response){
    // console.log(response);
    vm.hotel = response.data;
    vm.stars = _getStarRating(response.data.stars);
    console.log("response.data.stars: ", response.data.stars);
    console.log("vm.stars: ", vm.stars);

  });//hotelDisplay

  function _getStarRating(stars){
    return new Array(stars);
  }//_getStarRating

  vm.addReview = function(){
    var postData = {
      name: vm.name,
      rating: vm.rating,
      review: vm.review
    };
    if (vm.reviewForm.$valid) {
      hotelDataFactory.postReview(id, postData).then(function(response){
        if( response.status == 201){
          $route.reload();
          console.log("why aren't we reloading?");
        }//if
      }).catch(function(error){
        console.log("error posting review: ", error);
      });
    }//if
    else {
      vm.isSubmitted = true;
    }
  }//vm.addReview

}//HotelController
