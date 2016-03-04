application.service('dCourse', function($http, _, formService) {
   var mainRow;
   
   return {
       update: function(formData){
           return $http.put('/Course/' + formData.model.courseID, formData.model);
       },
       create: function(formData){
           formData.model.departmentID = mainRow.entity.departmentID;
            return $http.post('/Course/', formData.model);
       },
       delete: function(formData){
           return $http.delete('/Course/' + formData.model.courseID);
       },
       initAddForm: function(formData, gridData, mRow) {
           mainRow = mRow;
           
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, null, 'dCourse', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description"
            }];

            formService.init(formData, gridData, row, 'dCourse', false);
        },
   };
});