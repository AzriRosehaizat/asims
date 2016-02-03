application.service('regularStaffService', function($mdDialog, _, moment) {

    return {
        flattenData: function(regularStaffs) {
            var flattenedData = [];
            _.forEach(regularStaffs, function(value, key) {
                flattenedData.push({
                    regularStaffID: value.regularStaffID,
                    employeeNo: value.academicStaffID[0].employeeNo,
                    firstName: value.academicStaffID[0].firstName,
                    lastName: value.academicStaffID[0].lastName,
                    departmentCode: value.academicStaffID[0].departments[0].departmentID.departmentCode,
                    rank: findCurrentRank(value),
                    contApptDate: formatDate(value.contApptDate),
                    tenureDate: formatDate(value.tenureDate)
                });
            });
            return flattenedData;
        }
    };

    function findCurrentRank(value) {
        var currentRank = _.findLast(value.ranks, function(rank) {
            return !rank.endDate;
        });

        if (currentRank) return currentRank.rankID.title;
        return null;
    }

    function formatDate(date) {
        if (date) return moment(date).format('YYYY-MM-DD');
        return null;
    }
});