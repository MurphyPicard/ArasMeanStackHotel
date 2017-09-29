angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http){

  return{
    hotelList: hotelList,
    hotelDisplay: hotelDisplay,
    postReview: postReview
  }

  // replaces the GET in the controllers
  function hotelList(){
    return $http.get('/api/hotels?count=9').then(complete).catch(failed);
  }

  function hotelDisplay(id){
    return $http.get('/api/hotels/' + id).then(complete).catch(failed);
  }


  function postReview(id, review){
    return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
  }


  // two functionis used as callbacks above
  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }

}
