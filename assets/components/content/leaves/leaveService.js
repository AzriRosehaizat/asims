/* global
    application
*/

application
.service(
    'leaveService', 
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
                            'First Name',
                        field: 
                            'firstName'
                    }, {
                        name: 
                            'Last Name',
                        field: 
                            'lastName'
                    }, {
                        name: 
                            'Department',
                        field: 
                            'departmentCode'
                    }, {
                        name: 
                            'Rank',
                        field: 
                            'Rank'
                    }, {
                        name: 
                            'Tenure Date',
                        field: 
                            'tenureDate',
                        cellFilter: 
                            'date:\'yyyy-MM-dd\''
                    }, {
                        name: 
                            'Cont\' appointment date',
                        field: 
                            'contAppDate',
                        cellFilter: 
                            'date:\'yyyy-MM-dd\''
                    }
                ]
            },
            setForm: function( formData, gridData, row ) {
                formData
                .model = (
                    _.cloneDeep(
                        row.entity
                    )
                );
                
                formData
                .isEditing = (
                    true
                );
                
                formData
                .title = (
                    'Regular Staff Details'
                );
                
                formData
                .inputs = [
                    {
                        type: 
                            "text",
                        name: 
                            "firstName",
                        label: 
                            "First name",
                        disabled: 
                            true
                    }, {
                        type: 
                            "text",
                        name: 
                            "lastName",
                        label: 
                            "Last name",
                        disabled: 
                            true
                    }
                ];
    
                formService.init( 
                    formData, 
                    gridData, 
                    row, 
                    'leaveService', 
                    true
                );
            }
        };
    }
);