application.factory('DataService', function($http) {
    return {
        getUser: function(id) {
            var req = $http.get('/user/' + id);
            return (req.then(handleSuccess));
        },
        getUsers: function() {
            var req = $http.get('/user');
            return (req.then(handleSuccess));
        },
        updateUser: function(user) {
            var req = $http.put('/user/update', user);
            return (req.then(handleSuccess));
        },
        deleteUser: function(id) {
            var req = $http.delete('/user/' + id);
            return (req.then(handleSuccess));
        },
    };
    
    function handleSuccess(res) {
        return (res.data);
    }
});