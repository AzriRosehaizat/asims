application.service('CurrentUser', function($http, LocalService) {
    return {
        getUser: function() {
            if (LocalService.get('auth_token')) {
                return $http.get('/user/findByToken');
            }
            else {
                return {};
            }
        }
    };
});