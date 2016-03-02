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
                                'leaveCreditType'
                        }
                    ],
                    onRegisterApi : function( gridApi ){
                        gridApi
                        .selection
                        .on
                        .rowSelectionChanged( 
                            $scope, 
                            function( row ){
                                console
                                .log(
                                    row
                                );
                                // do whatever
                            }
                        );
                    }
                };
            }
        };
    }
);