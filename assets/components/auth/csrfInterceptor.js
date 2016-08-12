application.factory('csrfInterceptor', function($q, $injector) {
  var token = false;

  return {
    request: function(config) {
      var CSRF_URL = '/csrfToken';

      if (config.url == CSRF_URL || config.method == "GET") {
        return config;
      }

      if(token) {
        config.data._csrf = token;
        return config;
      }

      var deferred = $q.defer();
      var $http = $injector.get('$http');
    
      $http.get(CSRF_URL).success(function(response, status, headers) {
	if (response._csrf) {
	  token = response._csrf;
	  config.data._csrf = token;
	}	
	deferred.resolve(config);
      }).error(function(response, status, headers) {
	deferred.reject(response);
      });

      return deferred.promise;
    }
  }
});

//application.config(function($httpProvider) {
//  $httpProvider.interceptors.push('csrfInterceptor');
//});
