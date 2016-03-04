application.controller('homeHeaderController', function($http, $scope, user, moment) {

    $scope.user = user.data;

    //Get last login information
    $http.get('/User/' + user.data.id + '/attempts?where={"successful":true}&sort=createdAt DESC&limit=2')
        .then(function(res) {
            $scope.lastLogin = (res.data[1].createdAt) ? moment(res.data[1].createdAt).fromNow() : "Welcome New User";
        });
});