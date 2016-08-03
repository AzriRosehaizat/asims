application.service('overloadRASTA', ['$http', '_', 'formService', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/overload/' + formData.model.overloadID, formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=overload&id=' + formData.model.academicStaffID +
                        '&where=' + res.data.overloadID);
                });
        },
        create: function(formData) {
            return $http.post('/overload', formData.model)
                .then(function(res) {
                    return $http.get('/regularStaff/getInfo?type=overload&id=' + mainRow.entity.academicStaffID +
                        '&where=' + res.data.overloadID);
                });
        },
        delete: function(formData) {
            return $http.delete('/overload/' + formData.model.overloadID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Overload Course';
            formData.inputs = [{
                type: "autocomplete",
                name: "courseSection",
                label: "Course Section (ex. ACS-0000-001)",
                url: {
                    start: "/regularStaff/getInfo?type=teaching&id=" + mainRow.entity.academicStaffID + "&search={",
                    end: "\"courseSection\":{\"startsWith\":\""
                },
                link: "application.teachingActivityRAS",
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
                type: "currency",
                name: "amount",
                label: "Amount (CAD)"
            }];

            formService.init(formData, gridData, null, 'overloadRASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            row.entity.courseSection = row.entity.departmentCode + "-" +
                                       row.entity.courseNo + "-" +
                                       row.entity.sectionNo;

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Overload Course';
            formData.inputs = [{
                type: "autocomplete",
                name: "courseSection",
                label: "Course Section (ex. ACS-0000-001)",
                url: {
                    start: "/regularStaff/getInfo?type=teaching&id=" + mainRow.entity.academicStaffID + "&search={",
                    end: "\"courseSection\":{\"startsWith\":\""
                },
                link: "application.teachingActivityRAS",
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
                type: "currency",
                name: "amount",
                label: "Amount (CAD)"
            }];

            formService.init(formData, gridData, row, 'overloadRASTA', false);
        }
    };
}]);