application.service('taRASTabService', function($http, taRASTA, overloadRASTA, creditRASTA, debitRASTA, loadRASTA, reductionRASTA, increaseRASTA) {

    return {
        tabs: function() {
            return {
                teachingActivity: {
                    title: 'Teaching Activity',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Dept. Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Course No.',
                            field: 'courseNo',
                        }, {
                            name: 'Section No.',
                            field: 'sectionNo',
                        }, {
                            name: 'Title',
                            field: 'title',
                        }, {
                            name: 'Term',
                            field: 'term',
                        }, {
                            name: 'Year',
                            field: 'year',
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'FCE',
                            displayName: 'FCE',
                            field: 'FCEValue'
                        }, {
                            name: 'Role',
                            field: 'role'
                        }]
                    }
                },
                overload: {
                    title: 'Overload',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Dept. Code',
                            field: 'departmentCode'
                        }, {
                            name: 'Course No.',
                            field: 'courseNo',
                        }, {
                            name: 'Section No.',
                            field: 'sectionNo',
                        }, {
                            name: 'Title',
                            field: 'title',
                        }, {
                            name: 'Term',
                            field: 'term',
                        }, {
                            name: 'Year',
                            field: 'year',
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'FCE',
                            displayName: 'FCE',
                            field: 'FCEValue'
                        }, {
                            name: 'Amount',
                            field: 'amount',
                            cellFilter: 'currency'
                        }]
                    }
                },
                FCECredit: {
                    title: 'FCE Credit',
                    gridOptions: {
                        columnDefs: [{
                            name: 'FCE Value',
                            displayName: 'FCE Value',
                            field: 'FCEValue'
                        }, {
                            name: 'Description',
                            field: 'description'
                        }, {
                            name: 'Date Issued',
                            field: 'dateIssued',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Credit Type',
                            field: 'FCECreditType'
                        }]
                    }
                },
                FCEDebit: {
                    title: 'FCE Debit',
                    gridOptions: {
                        columnDefs: [{
                            name: 'FCE Value',
                            displayName: 'FCE Value',
                            field: 'FCEValue'
                        }, {
                            name: 'Description',
                            field: 'description'
                        }, {
                            name: 'Date Issued',
                            field: 'dateIssued',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Debit Type',
                            field: 'FCEDebitType'
                        }]
                    }
                },
                load: {
                    title: 'Load',
                    gridOptions: {
                        columnDefs: [{
                            name: 'FCE Value',
                            displayName: 'FCE Value',
                            field: 'FCEValue'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }]
                    }
                },
                loadReduction: {
                    title: 'Load Reduction',
                    gridOptions: {
                        columnDefs: [{
                            name: 'FCE Value',
                            displayName: 'FCE Value',
                            field: 'FCEValue'
                        }, {
                            name: 'Description',
                            field: 'description'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }]
                    }
                },
                loadIncrease: {
                    title: 'Load Increase',
                    gridOptions: {
                        columnDefs: [{
                            name: 'FCE Value',
                            displayName: 'FCE Value',
                            field: 'FCEValue'
                        }, {
                            name: 'Description',
                            field: 'description'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }]
                    }
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Teaching Activity':
                    taRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Overload':
                    overloadRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'FCE Credit':
                    creditRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'FCE Debit':
                    debitRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Load':
                    loadRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Load Reduction':
                    reductionRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Load Increase':
                    increaseRASTA.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching Activity':
                    taRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Overload':
                    overloadRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'FCE Credit':
                    creditRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'FCE Debit':
                    debitRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Load':
                    loadRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Load Reduction':
                    reductionRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Load Increase':
                    increaseRASTA.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getTeachingActivity(tabs.teachingActivity, row);
            this.getOverload(tabs.overload, row);
            this.getFCECredit(tabs.FCECredit, row);
            this.getFCEDebit(tabs.FCEDebit, row);
            this.getLoad(tabs.load, row);
            this.getLoadReduction(tabs.loadReduction, row);
            this.getLoadIncrease(tabs.loadIncrease, row);
        },
        getTeachingActivity: function(teachingActivity, row) {
            $http.get('/regularStaff/getInfo?type=teaching&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    teachingActivity.gridOptions.data = res.data;
                });
        },
        getOverload: function(overload, row) {
            $http.get('/regularStaff/getInfo?type=overload&id=' + row.entity.academicStaffID)
                .then(function(res) {
                    overload.gridOptions.data = res.data;
                });
        },
        getFCECredit: function(FCECredit, row) {
            $http.get('/FCECredit?regularStaffID=' + row.entity.regularStaffID)
                .then(function(res) {
                    FCECredit.gridOptions.data = res.data;
                });
        },
        getFCEDebit: function(FCEDebit, row) {
            $http.get('/FCEDebit?regularStaffID=' + row.entity.regularStaffID)
                .then(function(res) {
                    FCEDebit.gridOptions.data = res.data;
                });
        },
        getLoad: function(load, row) {
            $http.get('/load?regularStaffID=' + row.entity.regularStaffID)
                .then(function(res) {
                    load.gridOptions.data = res.data;
                });
        },
        getLoadReduction: function(loadReduction, row) {
            $http.get('/loadReduction?regularStaffID=' + row.entity.regularStaffID)
                .then(function(res) {
                    loadReduction.gridOptions.data = res.data;
                });
        },
        getLoadIncrease: function(loadIncrease, row) {
            $http.get('/loadIncrease?regularStaffID=' + row.entity.regularStaffID)
                .then(function(res) {
                    loadIncrease.gridOptions.data = res.data;
                });
        }
    };
});