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
                
                ]
            }
        };
    }
);