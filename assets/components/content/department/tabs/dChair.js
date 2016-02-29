application.service('dCourse', function($http, _, formService) {
   var mainRow;
   
   return {
       update: function(formData){
           return $http.put('/Chair/' + formData.model.chairID, formData.model);
       },
       create: function(formData){
           formData.model.departmentID = mainRow.entity.departmentID;
            return $http.post('/Chair/', formData.model);
       },
       delete: function(formData){
           return $http.delete('/Chair/' + formData.model.chairID);
       },
       initAddForm: function(formData, gridData, mRow) {
           mainRow = mRow;
           
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Chair';
            formData.inputs = [{
                type: "autocomplete",
                name: "firstName",
                label: "First Name",
                url: {
                    start: "/academicStaff?where={",
                    end: "\"firstName\":{\"startsWith\":\""
                },
                link: "application.academicStaff",
                output: {
                    obj: {},
                    name: "firstName"
                },
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'dChair', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Chair';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'dChair', false);
        },
   };
});