application.service('CurrentUser', function(DataService, LocalService) {
    return {
        getID: function() {
            if (LocalService.get('auth_token')) {
                return angular.fromJson(LocalService.get('auth_token')).user.id;
            }
            console.log("There's something wrong with the token. Please log out and log in again");
            return {};
        },
        getUser: function() {
            return DataService.getById('/user/', this.getID())
                .then(function(data) {
                    return data;
                });
        },
        getRole: function() {
            if (LocalService.get('auth_token')) {
                var localRole = angular.fromJson(LocalService.get('auth_token')).user.role;

                // verify localRole against data from server
                // if it's false, delete token and do something
                this.getUser().then(function(data) {
                    if (localRole !== data.role.id) {
                        console.warn("User's role has been modified. local: " + localRole + ", server: " + data.role.id);
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