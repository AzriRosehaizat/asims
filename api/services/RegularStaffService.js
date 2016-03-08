/*global 
	RegularStaff 
	LeaveCredit
*/

var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {
	getAllRegularStaff: function(regularStaffID, callback) {
		var sSQL = mysql.select('a.*', 'r.*', 'd.departmentCode', 'rk.title AS Rank')
			.from('AcademicStaff AS a')
			.innerJoin('RegularStaff AS r', 'a.academicStaffID', 'r.academicStaffID')
			.leftJoin('MostRecentRank_Regular AS rv', 'r.regularStaffID', 'rv.regularStaffID')
			.leftJoin('Rank AS rk', 'rv.rankID', 'rk.rankID')
			.leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
			.leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID');

		sSQL = (regularStaffID) ? sSQL.where('r.regularStaffID', regularStaffID).groupBy('a.academicStaffID').toString()
								: sSQL.orderBy('a.academicStaffID', 'desc').groupBy('a.academicStaffID').toString();
		RegularStaff.query(sSQL, callback);
	},
	getTeachingActivity: function(id, where, search, callback) {
		var sSQL = mysql.select('t.*', 'd.departmentID', 'd.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title')
			.from('AcademicStaff AS a')
			.innerJoin('TeachingActivities AS t', 'a.academicStaffID', 't.academicStaffID')
			.innerJoin('Section AS s', 't.sectionID', 's.sectionID')
			.innerJoin('Course AS c', 't.courseID', 'c.courseID')
			.innerJoin('Department AS d', 'c.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id);
		
		if (search) {
			var names = JSON.parse(search).courseSection.startsWith.split('-');
			var deptCode = names[0];
			sSQL = sSQL.where('d.departmentCode', 'like', deptCode + '%');
			
			if (names[1]) {
				var courseNo = names[1];
				sSQL = sSQL.where('c.courseNo', 'like', courseNo + '%');
			}
			if (names[2]) {
				var sectionNo = names[2];
				sSQL = sSQL.where('s.sectionNo', 'like', sectionNo + '%');
			}
		}
		
		sSQL = (where) ? sSQL.where('t.teachingActivitiesID', where).toString() : sSQL.toString();
		RegularStaff.query(sSQL, callback);
	},
	getOverload: function(id, where, callback) {
		var sSQL = mysql.select('o.*', 't.*', 'd.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title')
			.from('AcademicStaff AS a')
			.innerJoin('TeachingActivities AS t', 'a.academicStaffID', 't.academicStaffID')
			.innerJoin('Overload AS o', 't.teachingActivitiesID', 'o.teachingActivitiesID')
			.innerJoin('Section AS s', 't.sectionID', 's.sectionID')
			.innerJoin('Course AS c', 't.courseID', 'c.courseID')
			.innerJoin('Department AS d', 'c.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('o.overloadID', where).toString() : sSQL.toString();
		RegularStaff.query(sSQL, callback);	
	},
	getDepartment: function(id, where, callback) {
		var sSQL = mysql.select('d.*', 'ad.*', 'ad.academicStaffID')
			.from('AcademicStaff AS a')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('ad.academicStaffDepartmentID', where).toString() : sSQL.toString();
		RegularStaff.query(sSQL, callback);
	},
	getRank: function(id, where, callback) {
		var sSQL = mysql.select('rk.*', 'rs.*', 'r.academicStaffID')
			.from('RegularStaff AS r')
			.innerJoin('RegularStaff_Rank AS rs', 'r.regularStaffID', 'rs.regularStaffID')
			.innerJoin('Rank AS rk', 'rs.rankID', 'rk.rankID')
			.where('r.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('rs.regularStaffRankID', where).toString() : sSQL.toString();
		RegularStaff.query(sSQL, callback);
	},
	getResearch: function(id, where, callback) {
		var sSQL = mysql.select('r.title', 'r.abstract', 'ar.*')
			.from('RegularStaff AS a')
			.innerJoin('RegularStaff_Research AS ar', 'a.regularStaffID', 'ar.regularStaffID')
			.innerJoin('Research as r', 'ar.researchID', 'r.researchID')
			.where('a.regularStaffID', id);

		if (where) {
			sSQL = sSQL.where('ar.regularStaffResearchID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		console.log(sSQL);
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getEmployment: function(id, where, callback) {
		var sSQL = mysql.select('re.*', 'r.academicStaffID')
			.from('RegularStaff AS r')
			.innerJoin('RegularStaffEmployment AS re', 'r.regularStaffID', 're.regularStaffID')
			.where('r.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('re.regularEmploymentID', where).toString() : sSQL.toString();
		RegularStaff.query(sSQL, callback);
	},
	getResearchStaff: function(id, where, callback) {
		var sSQL = mysql.select('rr.*', 'a.*', 'd.departmentCode')
			.from('RegularStaff_Research AS rr')
			.innerJoin('RegularStaff AS r', 'rr.regularStaffID', 'r.regularStaffID')
			.innerJoin('AcademicStaff AS a', 'r.academicStaffID', 'a.academicStaffID')
			.leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
			.leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID')
			.where('rr.researchID', id);
			
		sSQL = (where) ? sSQL.where('rr.regularStaffResearchID', where).toString() : sSQL.toString();
		RegularStaff.query(sSQL, callback);
	},


	/***************************************************************************
	 *	@desc:	Gets related leave credits from the LeaveCredit table
	 *	@param:	string id - regularStaffID to get
	 *	@param:	string where - additional where criteria to filter on (optional)
	 *	@param:	function callback - function to call post processing
	 */

	getLeaveCredits: function(id, where, callback) {
		var sql;

		// sql = mysql.select('*').from('LeaveCredit')
		// 	.where(Object.assign({
		// 		regularStaffID: id
		// 	}, where || {}));

		// LeaveCredit.query(sql.toString(), callback);

		sql = mysql.select('lc.*')
			.from('LeaveCredit AS lc')
			.where('lc.regularStaffID', id);

		sql = (where) ? sql.where('lc.leaveCreditID', where).toString() : sql.toString();
		LeaveCredit.query(sql, callback);
	},


	/***************************************************************************
	 *	@desc:	Gets related leave debits from the LeaveDebit table
	 *	@param:	string id - regularStaffID to get
	 *	@param:	string where - additional where criteria to filter on (optional)
	 *	@param:	function callback - function to call post processing
	 */

	getLeaveDebits: function(id, where, callback) {
		var sql;

		// sql = mysql.select('*').from('LeaveDebit')
		// 	.where(Object.assign({
		// 		regularStaffID: id
		// 	}, where || {}));

		// LeaveDebit.query(sql.toString(), callback);

		sql = mysql.select('ld.*')
			.from('LeaveDebit AS ld')
			.where('ld.regularStaffID', id);

		sql = (where) ? sql.where('ld.leaveDebitID', where).toString() : sql.toString();
		LeaveDebit.query(sql, callback);
	}
};