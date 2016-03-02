/* global
    application
*/

application
.service(
    'leavesTabs', 
    function(
        $http, 
        leavesCredits,
        leavesDebits
    ){
        return {
            tabs : {
                credits : {
                    title: 
                        'Credits',
                    gridOptions: 
                        leavesCredits
                        .gridOptions
                },
                debits : {
                    title: 
                        'Debits',
                    gridOptions: 
                        leavesDebits
                        .gridOptions
                }
            }
        };
    }
);