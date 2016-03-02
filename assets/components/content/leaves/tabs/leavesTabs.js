/* global
    application
*/

application
.service(
    'leavesTabs', 
    function(
        $http, 
        leaveCredits,
        leaveDebits
    ){
        return {
            tabs : {
                credits : {
                    title: 
                        'Credits',
                    gridOptions: 
                        leaveCredits
                        .gridOptions
                },
                debits : {
                    title: 
                        'Debits',
                    gridOptions: 
                        leaveDebits
                        .gridOptions
                }
            }
        };
    }
);