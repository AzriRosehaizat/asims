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
                                'Date Issued',
                            field: 
                                'dateIssued'
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
            create: create,
            update: update,
            delete: remove
        };
        
        function initializeEdit( formData, gridData, row ){
            formData
            .model = (
                _
                .cloneDeep(
                    row
                    .entity
                )
            );
            
            formData
            .isEditing = (
                true
            );
            
            formData
            .title = (
                'Edit Leave Debit'
            );
            
            formData
            .inputs = [
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
                        "dateIssued",
                    label: 
                        "Date Issued",
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
                'Add Leave Debit'
            );
            
            formData.inputs = [
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
                        "dateIssued",
                    label: 
                        "Date Issued",
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
        
    }
);