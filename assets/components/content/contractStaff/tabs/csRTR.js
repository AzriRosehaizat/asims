application.service('csRTR', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/rightToRefusal/' + formData.model.rightToRefusalID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rightToRefusal&id=' + formData.model.contractStaffID +
                        '&where=' + res.data.rightToRefusalID);
                });
        },
        create: function(formData) {
            formData.model.contractStaffID = mainRow.entity.contractStaffID;
            return $http.post('/rightToRefusal', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rightToRefusal&id=' + formData.model.contractStaffID +
                        '&where=' + res.data.rightToRefusalID);
                });
        },
        delete: function(formData) {
            return $http.delete('/rightToRefusal/' + formData.model.rightToRefusalID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Right To Refusal';
            formData.inputs = [{
                type: "autocomplete",
                name: "courseSection",
                label: "Course Section (ex. ACS-0000-001)",
                url: {
                    start: "/contractStaff/getInfo?type=teaching&id=" + mainRow.entity.academicStaffID + "&search={",
                    end: "\"courseSection\":{\"startsWith\":\""
                },
                link: "application.teachingActivityCAS",
                output: {
                    obj: {},
                    name: ["departmentCode", "courseNo", "sectionNo"],
                    meta: [{
                        tag: "",
                        name: "title"
                    }]
                },
                assign: [{
                    from: "courseSection.obj.teachingActivitiesID",
                    to: "teachingActivitiesID"
                }],
                required: true
            }, {
                type: "select",
                name: "term",
                label: "Term",
                items: formService.getTerms(),
                path: "term",
                text: "Select a term"
            }, {
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year"
            }];

            formService.init(formData, gridData, null, 'csRTR', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.courseSection = row.entity.departmentCode + "-" +
                                       row.entity.courseNo + "-" +
                                       row.entity.sectionNo;
                                       
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Right To Refusal';
            formData.inputs = [{
                type: "text",
                name: "courseSection",
                label: "Course Section",
                readonly: true
            }, {
                type: "select",
                name: "term",
                label: "Term",
                items: formService.getTerms(),
                path: "term",
                text: "Select a term"
            }, {
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year"
            }];

            formService.init(formData, gridData, row, 'csRTR', false);
        }
    };
});