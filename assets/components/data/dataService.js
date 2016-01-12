application.factory('DataService', function($http, $q) {
    return {
        getUsers: function() {
            var req = $http.get('/user');
            return (req.then(handleSuccess, handleError));
        },
        updateUser: function(user) {
            var req = $http.put('/user/update', user);
            return (req.then(handleSuccess, handleError));
        },
    };

    // transform the error response, unwrapping the application data from the API response payload.
    function handleError(res) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (!angular.isObject(res.data) || !res.data.summary) {
            console.log(res.data);
            return ($q.reject("An unknown error occurred."));
        }
        // Otherwise, use expected error message.
        return ($q.reject(res.data));
    }
    
    // transform the successful response, unwrapping the application data from the API response payload.
    function handleSuccess(res) {
        return (res.data);
    }
});