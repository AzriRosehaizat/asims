application.service('CurrentUser', function($http, $q, LocalService) {
    return {
        getUser: function() {
            if (LocalService.get('auth_token')) {
                return $http.get('/user/findByToken');
            }
            else {
                // return false so that isAdmin() in auth.js can return false as well.
                return $q.when(false);
            }
        }
    };
});