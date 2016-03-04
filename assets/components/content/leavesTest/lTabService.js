application.service('lTabService', function($http, leaveDebit, leaveCredit) {

    return {
        leftTabs: function() {
            return {
                leaveCredit: {
                    title: 'Credit',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Amount',
                            field: 'amount',
                            // aggregationType: uiGridConstants.aggregationTypes.sum
                        }, {
                            name: 'Date Issued',
                            field: 'dateIssued',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Type',
                            field: 'leaveCreditType'
                        }]
                    }
                },
                leaveDebit: {
                    title: 'Debit',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Amount',
                            field: 'amount',
                            // aggregationType: uiGridConstants.aggregationTypes.sum
                        }, {
                            name: 'Date Issued',
                            field: 'dateIssued',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Type',
                            field: 'leaveDebitType'
                        }]
                    }
                }
            };
        },
        rightTabs: function() {
            return {

            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Credit':
                    leaveCredit.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Debit':
                    leaveDebit.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Credit':
                    leaveCredit.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Debit':
                    leaveDebit.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(leftTabs, rightTabs, row) {
            this.getLeaveCredit(leftTabs.leaveCredit, row);
            this.getLeaveDebit(leftTabs.leaveDebit, row);
        },
        getLeaveCredit: function(leaveCredit, row) {
            $http.get('/regularStaff/getInfo?type=leaveCredits&id=' + row.entity.regularStaffID)
                .then(function(res) {
                    leaveCredit.gridOptions.data = res.data;
                });
        },
        getLeaveDebit: function(leaveDebit, row) {
            $http.get('/regularStaff/getInfo?type=leaveDebits&id=' + row.entity.regularStaffID)
                .then(function(res) {
                    leaveDebit.gridOptions.data = res.data;
                });
        }
    };
});