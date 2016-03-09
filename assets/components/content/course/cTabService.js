application.service('cTabService', function($http, cSection) {

    return {
        tabs: function() {
            return {
                section: {
                    title: 'Teaching History',
                    gridOptions: {
                        columnDefs: [{
                            name: 'First Name',
                            field: 'firstName'
                        }, {
                            name: 'Last Name',
                            field: 'lastName'
                        }, {
                            name: 'Section No.',
                            field: 'sectionNo'
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
                            name: 'Role',
                            field: 'role'
                        }]
                    },
                    readOnly: true
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Teaching History':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    cSection.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Teaching History':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    cSection.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getSection(tabs.section, row);
        },
        getSection: function(section, row) {
            $http.get('/course/getInfo?type=section&id=' + row.entity.courseID)
                .then(function(res) {
                    section.gridOptions.data = res.data;
                });
        }
    };
});