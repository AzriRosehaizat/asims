/* global
    application
*/

application
.service(
    'leaveDebits', 
    function(
        $http, 
        _, 
        formService
    ){
         return {
            gridOptions : function ( $scope ){
                return {
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
                                'leaveDebitType'
                        }
                    ],
                    onRegisterApi : function( gridApi ){
                        
                    }
                };
            }
        };
    }
);