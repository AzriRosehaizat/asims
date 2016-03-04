/*global 
	RegularStaff 
	LeaveCredit
*/

var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {
	//Page Regular Staff
	getAllRegularStaff: function(regularStaffID, callback) {
		// console.log(regularStaffID);
		var sSQL = mysql.select('a.*', 'r.*', 'd.departmentCode', 'rk.title AS Rank')
			.from('AcademicStaff AS a')
			.innerJoin('RegularStaff AS r', 'a.academicStaffID', 'r.academicStaffID')
			.leftJoin('MostRecentRank_Regular AS rv', 'r.regularStaffID', 'rv.regularStaffID')
			.leftJoin('Rank AS rk', 'rv.rankID', 'rk.rankID')
			.leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
			.leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID');

		//check if criteriea needed
		if (regularStaffID) {
			sSQL = sSQL.where('r.regularStaffID', regularStaffID).groupBy('a.academicStaffID').toString();
		}
		else {
			sSQL = sSQL.orderBy('a.academicStaffID', 'desc').groupBy('a.academicStaffID').toString();

		}
		// console.log(sSQL);
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getTeachingActivity: function(id, where, callback) {
		var sSQL = mysql.select('t.*', 'd.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title', 'so.startDate', 'so.endDate')
			.from('AcademicStaff AS a')
			.innerJoin('TeachingActivities AS t', 'a.academicStaffID', 't.academicStaffID')
			.innerJoin('Section_Offered AS so', 't.sectionOfferedID', 'so.sectionOfferedID')
			.innerJoin('Section AS s', 'so.sectionID', 's.sectionID')
			.innerJoin('Course AS c', 'so.courseID', 'c.courseID')
			.innerJoin('Department AS d', 'c.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id);

		if (where) {
			sSQL = sSQL.where('t.teachingActivitiesID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getDepartment: function(id, where, callback) {
		var sSQL = mysql.select('d.*', 'ad.*', 'ad.academicStaffID')
			.from('AcademicStaff AS a')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id);

		if (where) {
			sSQL = sSQL.where('ad.academicStaffDepartmentID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getRank: function(id, where, callback) {
		var sSQL = mysql.select('rk.*', 'rs.*', 'r.academicStaffID')
			.from('RegularStaff AS r')
			.innerJoin('RegularStaff_Rank AS rs', 'r.regularStaffID', 'rs.regularStaffID')
			.innerJoin('Rank AS rk', 'rs.rankID', 'rk.rankID')
			.where('r.academicStaffID', id);

		if (where) {
			sSQL = sSQL.where('rs.regularStaffRankID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getEmployment: function(id, where, callback) {
		var sSQL = mysql.select('re.*', 'r.academicStaffID')
			.from('RegularStaff AS r')
			.innerJoin('RegularStaffEmployment AS re', 'r.regularStaffID', 're.regularStaffID')
			.where('r.academicStaffID', id);

		if (where) {
			sSQL = sSQL.where('re.regularEmploymentID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
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