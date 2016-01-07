angular.module('application')
    .factory('CurrentUser', function(LocalService) {
        return {
            user: function() {
                if (LocalService.get('auth_token')) {
                    return angular.fromJson(LocalService.get('auth_token')).user;
                }
                else {
                    return {};
                }
            },
            
            update: function(jsonData) {
                if (LocalService.get('auth_token')) {
                    var token = JSON.parse(LocalService.get('auth_token'));
                    token.user.email = jsonData;  // only change email for now
                    LocalService.set('auth_token', JSON.stringify(token));
                }
                else {
                    return {};
                }
            }
        };
    });