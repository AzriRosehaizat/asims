application.service('DataService', function($http) {
    return {
        get: function(url) {
            return $http.get(url)
                .then(handleSuccess);
        },
        getById: function(url, id) {
            return $http.get(url + id)
                .then(handleSuccess);
        },
        put: function(url, data) {
            return $http.put(url, data)
                .then(handleSuccess);
        },
        post: function(url, data) {
            return $http.post(url, data)
                .then(handleSuccess);
        },
        delete: function(url, id) {
            return $http.delete(url + id)
                .then(handleSuccess);
        }
    };

    function handleSuccess(res) {
        return (res.data);
    }
});