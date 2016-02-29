application.service('dRegularStaff', function($http, _, formService) {
    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID, formData.model);
        },
        //   create: function(formData){
        //       formData.model.departmentID = mainRow.entity.departmentID;
        //         return $http.post('/Course/', formData.model);
        //   },
        delete: function(formData) {
            return $http.delete('/AcademicStaff_Department/' + formData.model.academicStaffDepartmentID);
        },
        //   initAddForm: function(formData, gridData, mRow) {
        //       mainRow = mRow;

        //         formData.model = {};
        //         formData.isEditing = false;
        //         formData.title = 'Add Course';
        //         formData.inputs = [{

        //         }];

        //         formService.init(formData, gridData, null, 'dRegularStaff', true);
        //     },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Course';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: true,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: true,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'dRegularStaff', false);
        },
    };
});