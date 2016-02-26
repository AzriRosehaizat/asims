application.service('rTabService', function($http) {

    return {
        tabs: function() {
            return {
                grant: {
                    title: 'Grant',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Name',
                            field: 'title'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }]
                    }
                },
                professor: {
                    title: 'Professor',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Name',
                            field: 'title'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }]
                    }
                }
            };
        },
    };
});