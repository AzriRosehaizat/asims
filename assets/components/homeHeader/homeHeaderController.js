application.controller('homeHeaderController', function($http, $scope, user) {

    $scope.user = user.data;

    //Get last login information
    $http.get('/User/' + user.data.id + '/attempts?where={"successful":true}&sort=createdAt DESC&limit=2')
        .then(function(res) {
            console.log(res.data);
            $scope.lastLogin = (res.data[1].createdAt) ? res.data[1].createdAt : "Welcome New User";
        });
});