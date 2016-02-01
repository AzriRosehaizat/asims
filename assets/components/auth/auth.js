application.service('Auth', function($state, $http, $q, LocalService, CurrentUser, AccessLevels) {
    return {
        authorize: function(access) {
            if (access === AccessLevels.admin) {
                return this.isAdmin();
            }
            else if (access === AccessLevels.reader) {
                return $q.when(this.isAuthenticated());
            }
            else {
                return $q.when(true);
            }
        },
        isAuthenticated: function() {
            return LocalService.get('auth_token');
        },
        isAdmin: function() {
            return CurrentUser.getUser()
                .then(function(res) {
                    return (res.data.role === AccessLevels.admin);
                });
        },
        login: function(credentials) {
            return $http.post('/auth/login', credentials)
                .then(function(res) {
                    LocalService.set('auth_token', JSON.stringify(res.data));
                });
        },
        logout: function() {
            $http.post('/auth/logout')
                .then(function(res) {
                   console.log(res.data); 
                });
            LocalService.unset('auth_token');
            $state.go('index');
        }
    };
});

application.service('AuthInterceptor', function($q, $injector, _, LocalService) {
        return {
            request: function(config) {
                var token;
                if (LocalService.get('auth_token')) {
                    token = JSON.parse(LocalService.get('auth_token')).token;
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
                else if (!_.isObject(res.data)) {
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