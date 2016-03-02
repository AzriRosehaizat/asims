/* global
    application
*/

application
.service(
    'leaveCredits', 
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
                            'Amount',
                        field: 
                            'amount'
                    }, {
                        name: 
                            'Date Issued',
                        field: 
                            'dateIssued'
                    }, {
                        name: 
                            'Description',
                        field: 
                            'description'
                    }, {
                        name: 
                            'Type',
                        field: 
                            'leaveCreditType'
                    }
                ]
            }
        };
    }
);