application.service('CurrentUser', function($http, $state, $q, LocalService, toaster) {

    var self = this;

    self.getUser = function() {
        if (LocalService.get('auth_token')) {
            return $http.get('/user/findByToken')
                .then(function(res) {
                    return res;
                }, function(err) {
                    toaster.error(err);

                    if (err.code === "noToken" || err.code === "noUser") {
                        LocalService.unset('auth_token');
                        $state.go('index');
                    }
                });
        }
        else {
            // return false so that isAdmin() in auth.js can return false as well.
            return $q.when(false);
        }
    };
});