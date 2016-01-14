application.factory('Auth', function($http, LocalService, CurrentUser, AccessLevels) {
        return {
            authorize: function(access) {
                if (access === AccessLevels.admin) {
                    return this.isAdmin();
                }
                else if (access === AccessLevels.reader) {
                    return this.isAuthenticated();
                }
                else {
                    return true;
                }
            },
            isAuthenticated: function() {
                return LocalService.get('auth_token');
            },
            isAdmin: function() {
                return (CurrentUser.getRole() === AccessLevels.admin);
            },
            login: function(credentials) {
                var login = $http.post('/auth/login/', credentials)
                    .then(function(res) {
                        LocalService.set('auth_token', JSON.stringify(res.data));
                    });
                return login;
            },
            logout: function() {
                // The backend doesn't care about logouts, delete the token and you're good to go.
                LocalService.unset('auth_token');
            },
            register: function(formData) {
                LocalService.unset('auth_token');
                var register = $http.post('/auth/register/', formData)
                    .then(function(res) {
                        LocalService.set('auth_token', JSON.stringify(res.data));
                    });
                return register;
            }
        };
    })
    .factory('AuthInterceptor', function($q, $injector, LocalService) {
        return {
            request: function(config) {
                var token;
                if (LocalService.get('auth_token')) {
                    token = angular.fromJson(LocalService.get('auth_token')).token;
                }
                if (token) {
                    config.headers.access_token = token;
                }
                return config;
            },
            responseError: function(res) {
                if (res.status === 401 || res.status === 403) {
                    LocalService.unset('auth_token');
                    $injector.get('$state').go('index');
                }
                else if (!angular.isObject(res.data)) {
                    // return $q.reject("An unknown error occurred.");
                    return $q.reject(res);
                }
                return $q.reject(res.data);
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });