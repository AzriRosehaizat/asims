application.service('rProfessor', function($http, _, formService) {
   var mainRow;
   
   return {
       update: function(formData){
           return $http.put('/RegularStaff_Research/' + formData.model.researchID, formData.model);
       },
       create: function(formData){
           formData.model.researchID = mainRow.entity.researchID;
            return $http.post('/RegularStaff_Research/', formData.model);
       },
       delete: function(formData){
           return $http.delete('/RegularStaff_Research/' + formData.model.researchID);
       },
       initAddForm: function(formData, gridData, mRow) {
           mainRow = mRow;
           
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Professor';
            formData.inputs = [{
                type: "text",
                name: "researchID",
                label: "Research ID",
                disabled: false,
                required: true
            },{
                type: "text",
                name: "regularStaffID",
                label: "Regular Staff ID",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "loadReductionID",
                label: "Load Reduction ID",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'rProfessor', false);
        },
        initEditForm: function(formData, gridData, row) {
            
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Professor';
            formData.inputs = [{
                type: "text",
                name: "researchID",
                label: "Research ID",
                disabled: false,
                required: true
            },{
                type: "text",
                name: "regularStaffID",
                label: "Regular Staff ID",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "loadReductionID",
                label: "Load Reduction ID",
                disabled: false,
                required: false
            },{
                type: "date",
                name: "startDate",
                label: "Start Date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'rProfessor', false);
        },
   };
});