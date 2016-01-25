application.service('CurrentUser', function($http, LocalService) {
    return {
        getID: function() {
            if (LocalService.get('auth_token')) {
                return angular.fromJson(LocalService.get('auth_token')).user.id;
            }
            console.log("There's something wrong with the token. Please log out and log in again");
            return {};
        },
        getUser: function() {
            return $http.get('/user/' + this.getID());
        },
        getRole: function() {
            if (LocalService.get('auth_token')) {
                var localRole = angular.fromJson(LocalService.get('auth_token')).user.role;

                // verify localRole against data from server
                // if it's false, delete token and do something
                this.getUser().then(function(res) {
                    if (localRole !== res.data.role.id) {
                        console.warn("User's role has been modified. local: " + localRole + ", server: " + res.data.role.id);
                        // TODO: show message and redirect to login page after deleting the token
                        LocalService.unset('auth_token');
                        return;
                    }
                });
                return localRole;
            }
            return {};
        },
    };
});