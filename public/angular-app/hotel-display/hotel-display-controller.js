angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController ($routeParams, hotelDataFactory){
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

}//HotelController
