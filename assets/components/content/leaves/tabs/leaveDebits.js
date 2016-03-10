/* global
    application
*/

application
.service(
    'leaveDebits', 
    function(
        $http, 
        _, 
        uiGridConstants,
        formService
    ){
        return {
            gridOptions : function ( $scope ){
                return {
                    showColumnFooter: true,
                    columnDefs: [
                        {
                            name: 
                                'Amount',
                            field: 
                                'amount',
                            aggregationType: 
                                uiGridConstants
                                .aggregationTypes
                                .sum
                        }, {
                            name: 
                                'Start Date',
                            field: 
                                'startDate',
                            cellFilter: 
                                'date:\'MM-dd-yyyy\''
                        }, {
                            name: 
                                'End Date',
                            field: 
                                'endDate',
                            cellFilter: 
                                'date:\'MM-dd-yyyy\''
                        }, {
                            name: 
                                'Type',
                            field: 
                                'leaveDebitType'
                        }
                    ],
                    onRegisterApi : function( gridApi ){
                        (function( gridOptions ){
                            gridApi
                            .selection
                            .on
                            .rowSelectionChanged( 
                                $scope, 
                                function( row ){
                                    $scope
                                    .tabRow = (
                                        row    
                                    );
                                    
                                    initializeEdit(
                                        $scope
                                        .formData,
                                        gridOptions
                                        .data,
                                        row
                                    );
                                }
                            );
                        })(this);
                    }
                };
            },
            initAddForm: initializeAdd,
            initEditForm: initializeEdit, 
            create: create,
            update: update,
            delete: remove
        };
        
        function initializeEdit( formData, gridData, row ){
            
            formData
            .model = (
                Object.
                assign(
                    _
                    .cloneDeep(
                        row
                        .entity
                    ),
                    {
                        startDate : 
                            formService
                            .formatDate(
                                row
                                .entity
                                .startDate
                            ),
                        endDate : 
                            formService
                            .formatDate(
                                row
                                .entity
                                .endDate
                            )
                    }   
                )
            );
            
            formData
            .isEditing = (
                true
            );
            
            formData
            .title = (
                'Leave Debit'
            );
            
            formData
            .inputs = getInputs();

            formService.init(
                formData, 
                gridData, 
                row, 
                'leaveDebits',
                false
            );
        }
        
        function initializeAdd( formData, gridData, parentRow ){
            
            formData
            .model = {
                regularStaffID : 
                    parentRow
                    .entity
                    .regularStaffID
            };
            
            formData
            .isEditing = (
                false
            );
            
            formData
            .title = (
                'Leave Debit'
            );
            
            formData
            .inputs = getInputs();

            formService.init(
                formData, 
                gridData, 
                null, 
                'leaveDebits',
                false
            );
        }
        
        function create( formData ){
            return $http
            .post(
                '/LeaveDebit/', 
                formData
                .model
            );
        }
        
        function update( formData ){
            return $http
            .put(
                '/LeaveDebit/' + 
                formData
                .model
                .leaveDebitID, 
                formData
                .model
            );
        }
        
        function remove( formData ){
            return $http
            .delete(
                '/LeaveDebit/' + 
                formData
                .model
                .leaveDebitID
            );   
        }
        
        function getInputs(){
            return [
                {
                    type: 
                        "number",
                    name: 
                        "amount",
                    label: 
                        "Amount",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "date",
                    name: 
                        "startDate",
                    label: 
                        "Start Date",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "date",
                    name: 
                        "endDate",
                    label: 
                        "End Date",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "text",
                    name: 
                        "leaveDebitType",
                    label: 
                        "Type",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "textarea",
                    name: 
                        "description",
                    label: 
                        "Description",
                    disabled: 
                        false,
                    required: 
                        false
                }
            ];
        }
    }
);