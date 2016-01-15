application.factory('CurrentUser', function(LocalService, DataService) {
    return {
        getID: function() {
            if (LocalService.get('auth_token')) {
                return angular.fromJson(LocalService.get('auth_token')).user.id;
            }
            else {
                console.log("There's something wrong with the token. Please log out and log in again");
                return {};
            }
        },
        getUser: function() {
            return DataService.getById('/user/', this.getID())
                .then(function(data) {
                    return data;
                });
        },
        getRole: function() {
            var localRole = angular.fromJson(LocalService.get('auth_token')).user.role;
            this.getUser().then(function(data) {
                if (localRole !== data.role.id) {
                    console.warn("User's role has been modified! local: " + localRole + ", server: " + data.role.id);
                    // don't need to do this after we set a policy to handle roles
                    return LocalService.unset('auth_token');
                }
                console.log("User's role has been verified. local: " + localRole + ", server: " + data.role.id);
            }, function(err) {
                console.warn(err);
            });
            return localRole;
        },
    };
});