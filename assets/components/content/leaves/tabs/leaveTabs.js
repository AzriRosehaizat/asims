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
                
                row
                .entity
                .administrativeBalance = 0;
                
                row
                .entity
                .researchBalance = 0;
                
                row
                .entity
                .completed = 0;
                
                getCredits( 
                    tabs
                    .credits,
                    regularStaffID,
                    row
                    .entity
                );
                
                getDebits( 
                    tabs
                    .debits,
                    regularStaffID,
                    row
                    .entity
                );
                
            }
        };
        
        function getCredits( creditsTab, regularStaffID, rowEntity ){
            
            $http
            .get(
                '/regularStaff/getInfo?type=leaveCredits&id=' + regularStaffID
            )
            .then( 
                function( res ) {
                    rowEntity.administrativeBalance += res
                    .data
                    .filter(function( value ){
                        return value.leaveCreditType === 'Administrative';
                    })
                    .map(function( value ){
                        return value.amount;
                    })
                    .reduce(function( previous, current){
                        return previous + current;
                    },0);
                    
                    rowEntity.researchBalance += res
                    .data
                    .filter(function( value ){
                        return value.leaveCreditType === 'Research';
                    })
                    .map(function( value ){
                        return value.amount;
                    })
                    .reduce(function( previous, current){
                        return previous + current;
                    },0);
                    
                    rowEntity
                    .completed ++;
                    
                    creditsTab
                    .gridOptions
                    .data = (
                        res
                        .data
                    );
                }
            );
            
        } 
        
        function getDebits( debitsTab , regularStaffID, rowEntity ){
            $http
            .get(
                '/regularStaff/getInfo?type=leaveDebits&id=' + regularStaffID
            )
            .then( 
                function( res ) {
                    
                    rowEntity.administrativeBalance -= res
                    .data
                    .filter(function( value ){
                        return value.leaveDebitType === 'Administrative';
                    })
                    .map(function( value ){
                        return value.amount;
                    })
                    .reduce(function( previous, current){
                        return previous + current;
                    },0);
                    
                    rowEntity.researchBalance -= res
                    .data
                    .filter(function( value ){
                        return value.leaveDebitType === 'Research';
                    })
                    .map(function( value ){
                        return value.amount;
                    })
                    .reduce(function( previous, current){
                        return previous + current;
                    },0);
                    
                    rowEntity
                    .completed ++;
                    
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

