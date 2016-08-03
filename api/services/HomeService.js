var mysql = require('knex')({
    client: 'mysql'
});

module.exports = {
    getLeaveCount: function(callback) {
        var sSQL = mysql.count(`ld.leaveDebitID AS NoOfLeave`)
            .from('LeaveDebit AS ld')
            .where(`ld.startDate`, '<=', new Date())
            .andWhere(`ld.endDate`, '>', new Date())
            .orWhereNull(`ld.endDate`)
            .toString();
        RegularStaff.query(sSQL, callback);
    },
    getContractStaffCount: function(callback) {
        var sSQL = mysql.count(`c.contractStaffID AS NoOfContractStaff`)
            .from('ContractStaffRank AS c')
            .where(`c.startDate`, '<=', new Date())
            .andWhere(`c.endDate`, '>', new Date())
            .orWhereNull(`c.endDate`)
            .toString();
        RegularStaff.query(sSQL, callback);
    },

    getRegularStaffCount: function(callback) {
        var sSQL = mysql.count(`r.regularStaffID AS NoOfRegularStaff`)
            .from('RegularStaffRank AS r')
            .where(`r.startDate`, '<=', new Date())
            .andWhere(`r.endDate`, '>', new Date())
            .orWhereNull(`r.endDate`)
            .toString();

        RegularStaff.query(sSQL, callback);
    },
    getResearchCount: function(callback) {
        var sSQL = mysql.count(`r.researchID AS NoOfResearch`)
            .from('Research AS r')
            .where(`r.startDate`, '<=', new Date())
            .andWhere(`r.endDate`, '>', new Date())
            .orWhereNull(`r.endDate`)
            .toString();
        RegularStaff.query(sSQL, callback);
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
            .where(`rv.startDate`, '<=', new Date())
            .andWhere(`rv.endDate`, '>', new Date())
            .orWhereNull(`rv.endDate`)
            .toString();
        RegularStaff.query(sSQL, callback);
    },
    getContractStaff: function(callback) {
        var sSQL = mysql.select('a.firstName AS First Name', 'a.lastName AS Last Name', 'a.employeeNo AS Employee No', 'd.departmentCode AS Department', 'rk.title AS Rank', 'cv.startDate AS Start Date', 'cv.endDate AS End Date')
            .from('AcademicStaff AS a')
            .innerJoin('ContractStaff AS c', 'a.academicStaffID', 'c.academicStaffID')
            .leftJoin('MostRecentRank_Contract AS cv', 'c.contractStaffID', 'cv.contractStaffID')
            .leftJoin('Rank AS rk', 'cv.rankID', 'rk.rankID')
            .leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
            .leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID')
            .where(`cv.startDate`, '<=', new Date())
            .andWhere(`cv.endDate`, '>', new Date())
            .orWhereNull(`cv.endDate`)
            .toString();
        RegularStaff.query(sSQL, callback);
    },
    getLeave: function(callback) {
        var sSQL = mysql.select('a.firstName AS First Name', 'a.lastName AS Last Name', 'd.departmentCode AS Department', 'rk.title AS Rank', 'ld.startDate AS Leave Start Date', 'ld.endDate AS Leave End Date')
            .from('LeaveDebit AS ld')
            .innerJoin('RegularStaff AS r', 'ld.regularStaffID', 'r.regularStaffID')
            .leftJoin('AcademicStaff AS a', 'r.academicStaffID', 'a.academicStaffID')
            .leftJoin('MostRecentRank_Regular AS rv', 'r.regularStaffID', 'rv.regularStaffID')
            .leftJoin('Rank AS rk', 'rv.rankID', 'rk.rankID')
            .leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
            .leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID')
            .where(`ld.startDate`, '<=', new Date())
            .andWhere(`ld.endDate`, '>', new Date())
            .orWhereNull(`ld.endDate`)
            .toString();
        RegularStaff.query(sSQL, callback);

    },
    getResearch: function(callback) {
        var sSQL = mysql.select('r.title AS Title', 'r.startDate As Start Date', 'r.endDate As End Date', 'rg.grantingAgency AS Granting Agency', 'rg.dateAwarded AS Date Awarded', 'rg.duration AS Duration', 'rg.amount AS Amount $')
            .from('Research AS r')
            .leftJoin('ResearchGrant AS rg', 'r.researchID', 'rg.researchID')
            .where(`r.startDate`, '<=', new Date())
            .andWhere(`r.endDate`, '>', new Date())
            .orWhereNull(`r.endDate`)
            // limit to show only one research grant
            .groupBy('r.researchID');
        sSQL = sSQL.toString();
        RegularStaff.query(sSQL, callback);
    },
};