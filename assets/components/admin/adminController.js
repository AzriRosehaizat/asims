application.controller('adminController', function($scope) {
    $scope.gridOptions = {
        enableRowSelection: true,
        enableSorting: true,
        columnDefs: [{
            name: 'First Name',
            field: 'firstName'
        }, {
            name: 'Last Name',
            field: 'lastName'
        }, {
            name: 'Hire Date',
            field: 'hireDate'
        }, ],
        data: [{
            firstName: 'James',
            lastName: 'MacKay',
            hireDate: '02/28/1991'
        }, {
            firstName: 'Azri',
            lastName: 'Don\'tRemember',
            hireDate: 'Don\'t Know'
        }]
    };
});