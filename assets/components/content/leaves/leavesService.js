/* global
    application
*/

application
.service(
    'leavesService', 
    function(
        $http, 
        _, 
        formService
    ){
        return {
            gridOptions : {
                columnDefs: [
                    {
                        name: 
                            'First Name',
                        field: 
                            'firstName'
                    }, {
                        name: 
                            'Last Name',
                        field: 
                            'lastName'
                    }, {
                        name: 
                            'Department',
                        field: 
                            'departmentCode'
                    }, {
                        name: 
                            'Rank',
                        field: 
                            'Rank'
                    }, {
                        name: 
                            'Tenure Date',
                        field: 
                            'tenureDate',
                        cellFilter: 
                            'date:\'yyyy-MM-dd\''
                    }, {
                        name: 
                            'Cont\' appointment date',
                        field: 
                            'contAppDate',
                        cellFilter: 
                            'date:\'yyyy-MM-dd\''
                    }
                ]
            }
        };
    }
);