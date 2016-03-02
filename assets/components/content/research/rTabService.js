application.service('rTabService', function($http, rGrant, rStaff) {

    return {
        tabs: function() {
            return {
                grant: {
                    title: 'Grant',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Granting Agency',
                            field: 'grantingAgency'
                        }, {
                            name: 'Date Awarded',
                            field: 'dateAwarded',
                            cellFilter: 'date:\'MM-dd-yyyy\''
                        }, {
                            name: 'Duration',
                            field: 'duration',
                        }, {
                            name: 'Amount',
                            field: 'amount'
                        }]
                    }
                },
                staff: {
                    title: 'Staff',
                    gridOptions: {
                        columnDefs: [{
                            name: 'First Name',
                            field: 'firstName'
                        }, {
                            name: 'Last Name',
                            field: 'lastName'
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
                case 'Grant':
                    rGrant.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
                case 'Staff':
                    rStaff.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Grant':
                    rGrant.initEditForm(formData, tab.gridOptions.data, row);
                    break;
                case 'Staff':
                    rStaff.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getGrant(tabs.grant, row);
            this.getStaff(tabs.staff, row);
        },
        getGrant: function(grant, row) {
            $http.get('/Research/' + row.entity.researchID)
                .then(function(res) {
                    grant.gridOptions.data = res.data.ResearchGrant;
                });
        },
        getStaff: function(staff, row) {
            $http.get('/Research/' + row.entity.researchID)
                .then(function(res) {
                    staff.gridOptions.data = res.data.RegularStaff_Research;
                });
        }
    };
});