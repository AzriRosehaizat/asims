/* global
    application
*/

application
.service(
    'leaveTabs', 
    function(
        $http, 
        leaveCredits,
        leaveDebits
    ){
        return {
            tabs : function( $scope ){
                return {
                    credits : {
                        title: 
                            'Earned',
                        gridOptions: 
                            leaveCredits
                            .gridOptions( $scope ),
                        initializeAdd:
                            leaveCredits
                            .initAddForm,
                        initializeEdit:
                            leaveCredits
                            .initEditForm
                    },
                    debits : {
                        title: 
                            'Taken',
                        gridOptions: 
                            leaveDebits
                            .gridOptions( $scope ),
                        initializeAdd:
                            leaveDebits
                            .initAddForm,
                        initializeEdit:
                            leaveDebits
                            .initEditForm
                    }  
                };
            },
            initializeTabs : function( tabs, row ){
                var regularStaffID; 
                
                regularStaffID= (
                    row
                    .entity
                    .regularStaffID
                );
                
                getCredits( 
                    tabs
                    .credits,
                    regularStaffID
                );
                
                getDebits( 
                    tabs
                    .debits,
                    regularStaffID
                );
                
            }
        };
        
        function getCredits( creditsTab, regularStaffID ){
            
            $http
            .get(
                '/regularStaff/getInfo?type=leaveCredits&id=' + regularStaffID
            )
            .then( 
                function( res ) {
                    creditsTab
                    .gridOptions
                    .data = (
                        res
                        .data
                    );
                }
            );
            
        } 
        
        function getDebits( debitsTab , regularStaffID ){
            $http
            .get(
                '/regularStaff/getInfo?type=leaveDebits&id=' + regularStaffID
            )
            .then( 
                function( res ) {
                    
                    debitsTab
                    .gridOptions
                    .data = (
                        res
                        .data
                    );
                }
            );
            
        }
    }
);