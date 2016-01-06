application.service('loginModalService', function( $http, $q, $uibModal, Auth ) {
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
            Auth.login(user).success( function( response ){
                defer.resolve( response );
            }).error( function( err ) {
                defer.reject( err );
            });
            return defer.promise;
        }
    };
});
