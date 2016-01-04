application.service('loginModalService', function( $http, $q, $uibModal ) {
    return {
        'open': function () {
            return $uibModal.open( {
                animation: true,
                templateUrl: '/components/loginModal/loginModal.html',
                controller: 'loginModalController',
                size: 'sm'
            });
        },
        'submit': function ( user ) {
            var defer = $q.defer();
            $http.post('/auth/login', user).success( function( resp ){
                defer.resolve( resp );
            }).error( function( err ) {
                defer.reject( err );
            });
            return defer.promise;
        }
    };
});
