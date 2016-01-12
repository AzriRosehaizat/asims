application.factory('DataService', function($http) {
    return {
        getUsers: function() {
            var req = $http.get('/user');
            return (req.then(handleSuccess));
        },
        updateUser: function(user) {
            var req = $http.put('/user/update', user);
            return (req.then(handleSuccess));
        },
        deleteUser: function(user) {
            var req = $http.delete('/user/' + user.id);
            return (req.then(handleSuccess));
        },
    };
    
    function handleSuccess(res) {
        return (res.data);
    }
});