angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor (){
  return {
    request: request,
    response: response,
    responseError: responseError
  };

  function request(config){
    config.headers = config.headers || {};
    if(){}
  }

  function response(response){

  }

  function responseError(rejection){

  }

}
