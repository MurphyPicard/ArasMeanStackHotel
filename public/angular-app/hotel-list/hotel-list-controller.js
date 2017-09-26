angular.module('meanhotel').controller('HotelsController', HotelsController);


function HotelsController ($http){
  var vm = this;
  vm.title = "Ara's MEEEEEEEEEEEEAAAAAAAAAAAAN Hotel App";
  $http.get('/api/hotels?count=8').then(function(response){
    // console.log(response);
    vm.hotels = response.data;
  })
}
