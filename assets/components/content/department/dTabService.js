application.service('dTabService', function($http) {

    return {
        tabs: function() {
            return {
                course: {
                    title: 'Course',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Department',
                            field: 'departmentCode'
                        }, {
                            name: 'Course',
                            field: 'courseNo'
                        }, {
                            name: 'Title',
                            field: 'title'
                        }]
                    }
                },
                regularStaff: {
                    title: 'Regular Staff',
                    gridOptions: {
                        columnDefs: [{
                            name: 'First Name',
                            field: 'firstName'
                        }, {
                            name: 'Last Name',
                            field: 'lastName'
                        }, {
                            name: 'Rank',
                            field: 'Rank'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'Tenure Date',
                            field: 'tenureDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'Cont\' appointment date',
                            field: 'contAppDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }]
                    }
                },
                contractStaff: {
                    title: 'Contract Staff',
                    gridOptions: {
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
                chair: {
                    title: 'Chair',
                    gridOptions: {
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
        }
    };
});