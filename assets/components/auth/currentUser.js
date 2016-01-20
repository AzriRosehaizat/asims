application.factory('CurrentUser', function(DataService, LocalService) {
    return {
        getID: function() {
            if (LocalService.get('auth_token')) {
                return angular.fromJson(LocalService.get('auth_token')).user.id;
            }
            console.log("There's something wrong with the token. Please log out and log in again");
            return {};
        },
        getUser: function() {
            return DataService.get('/user/', this.getID())
                .then(function(data) {
                    return data;
                });
        },
        getRole: function() {
            if (LocalService.get('auth_token')) {
                var localRole = angular.fromJson(LocalService.get('auth_token')).user.role;

                this.getUser().then(function(data) {
                    if (localRole !== data.role.id) {
                        console.warn("User's role has been modified! local: " + localRole + ", server: " + data.role.id);
                        // don't need to do this after we set a policy to handle roles
                        return LocalService.unset('auth_token');
                    }
                });
                return localRole;
            }
            return {};
        },
    };
});