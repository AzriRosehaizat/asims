application.service('cTabService', function($http) {

    return {
        tabs: function() {
            return {
                section: {
                    title: 'Section',
                    gridOptions: {
                        multiSelect: false,
                        enableRowHeaderSelection: false,
                        enableHorizontalScrollbar: 0,
                        columnDefs: [{
                            name: 'Section Number',
                            field: 'sectionID'
                        }, {
                            name: 'Name',
                            field: 'title'
                        }, {
                            name: 'Start Date',
                            field: 'startDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }, {
                            name: 'End Date',
                            field: 'endDate',
                            cellFilter: 'date:\'yyyy-MM-dd\''
                        }]
                    }
                }
            };
        },
        // initAddForm: function(formData, tab, mainRow) {
        //     switch (tab.title) {
        //         case 'Section':
        //             cSection.initAddForm(formData, tab.gridOptions.data, mainRow);
        //             break;
        //         // case 'Instructors':
        //         //     rsDepartment.initAddForm(formData, tab.gridOptions.data, mainRow);
        //         //     break;
                
        //     }
        // },
        // initEditForm: function(formData, tab, row) {
        //     switch (tab.title) {
        //         case 'Section':
        //             cSection.initEditForm(formData, tab.gridOptions.data, row);
        //             break;
        //     }
        // },
        getTabs: function(tabs, row) {
            this.getSection(tabs.section, row);
            // this.getInstructor(tabs.instructor, row);
        },
        getSection: function(section,row){
            $http.get('/course/getInfo?type=section&id=' + row.entity.courseID)
                .then(function(res) {
                    section.gridOptions.data = res.data;
                });
        } 
    };
});