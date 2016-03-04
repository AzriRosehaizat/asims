application.service('dChair', function($http, _, formService) {
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
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date"
            }];

            formService.init(formData, gridData, null, 'dChair', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Chair';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End date"
            }];

            formService.init(formData, gridData, row, 'dChair', false);
        },
   };
});