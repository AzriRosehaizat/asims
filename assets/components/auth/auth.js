angular.module('application')
    .factory('Auth', function($http, LocalService, AccessLevels) {
        return {
            authorize: function(access) {
                if (access === AccessLevels.user) {
                    return this.isAuthenticated();
                }
                else {
                    return true;
                }
            },
            isAuthenticated: function() {
                return LocalService.get('auth_token');
            },
            login: function(credentials) {
                var login = $http.post('/auth/login', credentials);
                login.success(function(response) {
                    console.log(JSON.stringify(response));
                    LocalService.set('auth_token', JSON.stringify(response));
                });
                return login;
            },
            logout: function() {
                // The backend doesn't care about logouts, delete the token and you're good to go.
                LocalService.unset('auth_token');
            },
            register: function(formData) {
                LocalService.unset('auth_token');
                var register = $http.post('/auth/register', formData);
                register.success(function(response) {
                    LocalService.set('auth_token', JSON.stringify(response));
                });
                return register;
            }
        };
    })
    .factory('AuthInterceptor', function($q, $injector) {
        var LocalService = $injector.get('LocalService');

        return {
            request: function(config) {
                var token;
                if (LocalService.get('auth_token')) {
                    token = angular.fromJson(LocalService.get('auth_token')).token;
                }
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function(response) {
                if (response.status === 401 || response.status === 403) {
                    LocalService.unset('auth_token');
                    $injector.get('$state').go('index');
                }
                return $q.reject(response);
            }
        }
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });