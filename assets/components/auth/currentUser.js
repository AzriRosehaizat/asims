application.factory('CurrentUser', function(LocalService, DataService) {
    return {
        getUser: function() {
            var id = getID();
            return DataService.getUser(id)
                .then(function(data) {
                    return data;
                });
        },
        getRole: function() {
            return angular.fromJson(LocalService.get('auth_token')).user.role;
        },
    };

    function getID() {
        if (LocalService.get('auth_token')) {
            return angular.fromJson(LocalService.get('auth_token')).user.id;
        }
        else {
            return {};
        }
    }
});