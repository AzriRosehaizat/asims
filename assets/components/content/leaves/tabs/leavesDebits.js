/* global
    application
*/

application
.service(
    'leavesDebits', 
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