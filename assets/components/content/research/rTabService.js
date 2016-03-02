application.service('rTabService', function($http, rGrant, rProfessor) {

    return {
        tabs: function() {
            return {
                grant: {
                    title: 'Grant',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Granting Agency',
                            field: 'grantingAgency'
                        }, {
                            name: 'Date Awarded',
                            field: 'dateAwarded',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'Duration',
                            field: 'duration',
                        }, {
                            name: 'Amount',
                            field: 'amount'
                        }]
                    }
                },
                professor: {
                    title: 'Professor',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Research ID',
                            field: 'researchID',
                        }, {
                            name: 'Staff ID',
                            field: 'regularStaffID'
                        }, {
                            name: 'Load Reduction ID',
                            field: 'loadReductionID'
                        },{
                            name: 'Start Date',
                            field: 'startDate'
                        }]
                    }
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Grant':
                    rGrant.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Professor':
                    rProfessor.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Grant':
                    rGrant.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Professor':
                    rProfessor.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getGrant(tabs.grant, row);
            this.getProfessor(tabs.professor, row);
        },
        getGrant: function(grant, row) {
            $http.get('/Research/' + row.entity.researchID)
                .then(function(res) {
                    grant.gridOptions.data = res.data.ResearchGrant;
                });
        },
        getProfessor: function(professor, row) {
            $http.get('/Research/' + row.entity.researchID)
                .then(function(res) {
                    professor.gridOptions.data = res.data.RegularStaff_Research;
                });
        }
    };
});