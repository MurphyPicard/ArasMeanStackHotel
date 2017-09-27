angular.module('meanhotel').controller('HotelController', HotelController);



function HotelController ($routeParams, hotelDataFactory, $location, $route){
  var vm = this;
  var id = $routeParams.id;
  hotelDataFactory.hotelDisplay(id).then(function(response){
    // console.log(response);
    vm.hotel = response.data;
  });
}
