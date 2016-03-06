application.service('rightToRefuse', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.sectionNo)) {
                formData.model.sectionOfferedID = formData.model.sectionNo.obj.sectionOfferedID;
            }
            return $http.put('/rightToRefusal/' + formData.model.rightToRefusalID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rightToRefuse&id=' + formData.model.contractStaffID +
                        '&where=' + res.data.rightToRefusalID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.sectionNo)) {
                formData.model.sectionOfferedID = formData.model.sectionNo.obj.sectionOfferedID;
                formData.model.contractStaffID = mainRow.entity.contractStaffID;
            }
            return $http.post('/rightToRefusal', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rightToRefuse&id=' + formData.model.contractStaffID +
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
            formData.title = 'Add Right To Refuse';
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
                change: {
                    reset: "courseNo"
                },
                required: true
            }, {
                type: "acCustom",
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
                    name: "courseNo",
                    meta: [{
                        tag: "",
                        name: "title"
                    }]
                },
                change: {
                    reset: "sectionNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                readonly: true
            }, {
                type: "acCustom",
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
                link: "application.sectionOffered",
                output: {
                    obj: {},
                    name: "sectionNo",
                    meta: [{
                        tag: "",
                        name: "startDate"
                    }, {
                        tag: "- ",
                        name: "endDate"
                    }]
                },
                change: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "text",
                name: "startTerm",
                label: "Start Term",
                required: true
            }, {
                type: "text",
                name: "endTerm",
                label: "End Term",
                required: true
            }];

            formService.init(formData, gridData, null, 'rightToRefuse', false);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Right To Refuse';
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
                change: {
                    reset: "courseNo"
                },
                required: true
            }, {
                type: "acCustom",
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
                    name: "courseNo",
                    meta: [{
                        tag: "",
                        name: "title"
                    }]
                },
                change: {
                    reset: "sectionNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                readonly: true
            }, {
                type: "acCustom",
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
                link: "application.sectionOffered",
                output: {
                    obj: {},
                    name: "sectionNo",
                    meta: [{
                        tag: "",
                        name: "startDate"
                    }, {
                        tag: "- ",
                        name: "endDate"
                    }]
                },
                change: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "text",
                name: "startTerm",
                label: "Start Term",
                required: true
            }, {
                type: "text",
                name: "endTerm",
                label: "End Term",
                required: true
            }];

            formService.init(formData, gridData, row, 'rightToRefuse', false);
        }
    };
});