application.controller('adminController', function($scope, CurrentUser) {
    
    $scope.user = CurrentUser.user;
    
    $scope.gridOptions = {
        enableRowSelection: true,
        enableSorting: true,
        columnDefs: [{
            name: 'Name',
            field: 'username'
        }, {
            name: 'Email',
            field: 'email'
        }, ],
        data: [{
            username: 'testing',
            email: 'hello@foo.bar'
        }, {
            username: 'badguy',
            email: 'badguy@foo.bar'
        }]
    };
});