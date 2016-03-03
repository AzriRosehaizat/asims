application.service('CurrentUser', function($http, $state, $q, LocalService, toaster) {
    return {
        getUser: function() {
            if (LocalService.get('auth_token')) {
                return $http.get('/user/findByToken')
                    .then(function(res) {
                        return res;
                    }, function(err) {
                        toaster.error(err);
                        LocalService.unset('auth_token');
                        $state.go('index');
                    });
            }
            else {
                // return false so that isAdmin() in auth.js can return false as well.
                return $q.when(false);
            }
        }
    };
});