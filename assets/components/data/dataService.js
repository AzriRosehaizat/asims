application.factory('DataService', function($http) {
    return {
        get: function(url) {
            return $http.get(url)
                .then(handleSuccess);
        },
        getById: function(url, id) {
            var req = $http.get(url + id);
            return (req.then(handleSuccess));
        },
        update: function(url, data) {
            var req = $http.put(url, data);
            return (req.then(handleSuccess));
        },
        post: function(url, data) {
            var req = $http.post(url, data);
            return (req.then(handleSuccess));
        },
        delete: function(url, id) {
            var req = $http.delete(url + id);
            return (req.then(handleSuccess));
        }
    };
    
    function handleSuccess(res) {
        return (res.data);
    }
});