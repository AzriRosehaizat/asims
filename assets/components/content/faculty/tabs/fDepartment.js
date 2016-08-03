application.service('fDepartment', ['$http', '$q', '_', 'formService', function($http, $q, _, formService) {

    //var mainRow;

    return {
        update: function(formData) {
            //read only
        },
        create: function(formData) {
            //read only
        },
        delete: function(formData) {
            //read only
        },
        initAddForm: function(formData, gridData, mRow) {
            //mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code"
            },{
                type: "text",
                name: "title",
                label: "Name"
            },{
                type: "text",
                name: "description",
                label: "Description"
            }];
            
            formService.init(formData, gridData, null, 'fDepartment', false);
        },
        initEditForm: function(formData, gridData, row) {
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code"
            },{
                type: "text",
                name: "title",
                label: "Name"
            },{
                type: "text",
                name: "description",
                label: "Description"
            }];
            
            formService.init(formData, gridData, row, 'fDepartment', false);
        },
    };
}]);