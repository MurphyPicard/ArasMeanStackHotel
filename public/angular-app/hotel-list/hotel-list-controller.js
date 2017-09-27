angular.module('meanhotel').controller('HotelsController', HotelsController);


function HotelsController (hotelDataFactory){
  var vm = this;
  vm.title = "Ara's MEAAAAN Hotel App";
  hotelDataFactory.hotelList().then(function(response){
    // console.log(response);
    vm.hotels = response.data;
    console.log("res", response.data);
    console.log(vm.hotels);
  });
}
