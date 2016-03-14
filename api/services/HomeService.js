var mysql = require('knex')({
    client: 'mysql'
});

module.exports = {
    getLeaveCount: function(callback) {
        var sSQL = mysql.select('l.*')
            .from('CountLeave as l');

        sSQL = sSQL.toString();
        Home.query(sSQL, callback);
    },
    getResearchCount: function(callback) {
        var sSQL = mysql.select('re.*')
            .from('CountResearch as re');

        sSQL = sSQL.toString();
        Home.query(sSQL, callback);
    },

    getRegularStaffCount: function(callback) {
        var sSQL = mysql.count(`r.regularStaffID AS NoOfRegularStaff`)
            .from('RegularStaffRank AS r')
            .where(`r.endDate`, '>', new Date())
            .orWhereNull(`r.endDate`)
            .toString();

        Home.query(sSQL, callback);
    },
    getContractStaffCount: function(callback) {
        var sSQL = mysql.select('c.*')
            .from('CountEmployment_Contract as c');

        sSQL = sSQL.toString();
        Home.query(sSQL, callback);
    },
    // Get information current employed regular staff
    getRegularStaff: function(callback) {
        var sSQL = mysql.select('a.firstName AS First Name', 'a.lastName AS Last Name', 'd.departmentCode AS Department', 'rk.title AS Rank', 'rv.startDate AS Start Date', 'rv.endDate AS End Date')
            .from('AcademicStaff AS a')
            .innerJoin('RegularStaff AS r', 'a.academicStaffID', 'r.academicStaffID')
            .leftJoin('MostRecentRank_Regular AS rv', 'r.regularStaffID', 'rv.regularStaffID')
            .leftJoin('Rank AS rk', 'rv.rankID', 'rk.rankID')
            .leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
            .leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID')
            .where(`rv.endDate`, '>', new Date())
            .orWhereNull(`rv.endDate`)
            .toString();
        Home.query(sSQL, callback);
    },
    getContractStaff: function(callback) {
        var sSQL = mysql.select('a.firstName AS First Name', 'a.lastName AS Last Name', 'a.employeeNo AS Employee No', 'd.departmentCode AS Department', 'rk.title AS Rank', 'cv.startDate AS Start Date', 'cv.endDate AS End Date')
            .from('AcademicStaff AS a')
            .innerJoin('ContractStaff AS c', 'a.academicStaffID', 'c.academicStaffID')
            .leftJoin('MostRecentRank_Contract AS cv', 'c.contractStaffID', 'cv.contractStaffID')
            .leftJoin('Rank AS rk', 'cv.rankID', 'rk.rankID')
            .leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
            .leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID')
            .where(`cv.endDate`, '>', new Date())
            .orWhereNull(`cv.endDate`)
            .toString();
        Home.query(sSQL, callback);
    },
    getResearch: function(callback) {
        
    },
};