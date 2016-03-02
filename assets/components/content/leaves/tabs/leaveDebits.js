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
            gridOptions : {
                columnDefs: [
                
                ]
            }
        };
    }
);