application.service('rsTA', function($http, $q, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            // if (_.isObject(formData.model.title)) {
            //     formData.model.rankID = formData.model.title.obj.rankID;
            // }
            // return $http.put('/regularStaff_Rank/' + formData.model.regularStaffRankID, formData.model)
            //     .then(function(res) {
            //         res.data.title = res.data.rankID.title;
            //         res.data.rankID = res.data.rankID.rankID;
            //         return res;
            //     });
            $q.when(true);
        },
        create: function(formData) {
            // if (_.isObject(formData.model.title)) {
            //     formData.model.rankID = formData.model.title.obj.rankID;
            // }
            // formData.model.regularStaffID = mainRow.entity.regularStaffID;

            // return $http.post('/regularStaff_Rank', formData.model)
            //     .then(function(res) {
            //         return $http.get('/rank/' + res.data.rankID)
            //             .then(function(rank) {
            //                 res.data.title = rank.data.title;
            //                 return res;
            //             });
            //     });
            $q.when(true);
        },
        delete: function(formData) {
            // return $http.delete('/regularStaff_Rank/' + formData.model.regularStaffRankID);
            $q.when(true);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Teaching Activity';
            formData.inputs = [{
                type: "autocomplete",
                name: "departmentCode",
                label: "Dept. Code",
                url: {
                    start: "/department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                disabled: false,
                required: true
            }, {
                type: "autocomplete",
                name: "courseNo",
                label: "Course No.",
                url: {
                    start: "/course?where={",
                    end: "\"courseNo\":{\"startsWith\":\"",
                    where: [{
                        key: "departmentID", 
                        value: "departmentCode.obj.departmentID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "courseNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section_offered/search?where={",
                    end: "\"sectionNo\":{\"startsWith\":\"",
                    where: [{
                        key: "courseID", 
                        value: "courseNo.obj.courseID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "sectionNo"
                },
                copy: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
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

            formService.init(formData, gridData, null, 'rsTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            formService.formatDate(row.entity.startDate);
            formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Teaching Activity';
            formData.inputs = [{
                type: "autocomplete",
                name: "departmentCode",
                label: "Dept. Code",
                url: {
                    start: "/department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                disabled: false,
                required: true
            }, {
                type: "autocomplete",
                name: "courseNo",
                label: "Course No.",
                url: {
                    start: "/course?where={",
                    end: "\"courseNo\":{\"startsWith\":\"",
                    where: [{
                        key: "departmentID", 
                        value: "departmentCode.obj.departmentID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "courseNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section_offered/search?where={",
                    end: "\"sectionNo\":{\"startsWith\":\"",
                    where: [{
                        key: "courseID", 
                        value: "courseNo.obj.courseID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "sectionNo"
                },
                copy: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
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

            formService.init(formData, gridData, row, 'rsTA', false);
        },
    };
});