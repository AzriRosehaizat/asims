application.controller('rowEditController', function($uibModalInstance, grid, row) {

    var vm = this;

    vm.entity = angular.copy(row.entity);
    vm.schema = {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                title: 'Name'
            },
            email: {
                type: 'string',
                title: 'Email',
                pattern: '^\\S+@\\S+$'
            }
        },
        required: [
            'username',
            'email'
        ]
    };
    vm.form = [
        'username',
        'email'
    ];

    vm.save = function() {
        // Copy row values over
        row.entity = angular.extend(row.entity, vm.entity);
        $uibModalInstance.close(row.entity);
    }
    
    vm.delete = function() {
        // Delete row
        var index = grid.appScope.gridOptions.data.indexOf(row.entity);
        grid.appScope.gridOptions.data.splice(index, 1);
        $uibModalInstance.close(row.entity);
    }
});