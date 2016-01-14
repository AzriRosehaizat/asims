application.factory('DataService', function($http) {
    return {
        getUser: function(id) {
            var req = $http.get('/user/' + id);
            return (req.then(handleSuccess));
        },
        getUsers: function() {
            var req = $http.get('/user/');
            return (req.then(handleSuccess));
        },
        updateUser: function(user) {
            var req = $http.put('/user/update/', user);
            return (req.then(handleSuccess));
        },
        deleteUser: function(id) {
            var req = $http.delete('/user/' + id);
            return (req.then(handleSuccess));
        },
        get: function(url) {
            var req = $http.get(url);
            return (req.then(handleSuccess));
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