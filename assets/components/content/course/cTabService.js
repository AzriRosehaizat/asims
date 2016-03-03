application.service('cTabService', function($http, cSection) {

    return {
        tabs: function() {
            return {
                section: {
                    title: 'Section',
                    gridOptions: {
                        columnDefs: [{
                            name: 'Section No.',
                            field: 'sectionNo'
                        }, {
                            name: 'Type',
                            field: 'sectionType'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'FCE',
                            displayName: 'FCE',
                            field: 'FCEModifier'
                        }]
                    },
                    readOnly: true
                }
            };
        },
        initAddForm: function(formData, tab, mainRow) {
            switch (tab.title) {
                case 'Section':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    cSection.initAddForm(formData, tab.gridOptions.data, mainRow);
                    break;
            }
        },
        initEditForm: function(formData, tab, row) {
            switch (tab.title) {
                case 'Section':
                    tab.gridOptions.data.readOnly = tab.readOnly;
                    cSection.initEditForm(formData, tab.gridOptions.data, row);
                    break;
            }
        },
        getTabs: function(tabs, row) {
            this.getSection(tabs.section, row);
        },
        getSection: function(section, row){
            $http.get('/course/getInfo?type=section&id=' + row.entity.courseID)
                .then(function(res) {
                    section.gridOptions.data = res.data;
                });
        } 
    };
});