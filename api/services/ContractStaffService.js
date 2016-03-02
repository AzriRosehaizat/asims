var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {
	//Page Contract Staff
	getAllContractStaff: function(contractStaffID, callback) {
		var sSQL = mysql.select('a.*', 'c.*', 'd.departmentCode', 'rk.title AS Rank')
			.from('AcademicStaff AS a')
			.innerJoin('ContractStaff AS c', 'a.academicStaffID', 'c.academicStaffID')
			.leftJoin('MostRecentRank_Contract AS cv', 'c.contractStaffID', 'cv.contractStaffID')
			.leftJoin('Rank AS rk', 'cv.rankID', 'rk.rankID')
			.leftJoin('MostRecentDepartment AS dv', `a.academicStaffID`, 'dv.academicStaffID')
			.leftJoin('Department AS d', 'dv.departmentID', 'd.departmentID');

		//check if criteriea needed
		if (contractStaffID) {
			sSQL = sSQL.where('c.contractStaffID', contractStaffID).groupBy('a.academicStaffID').toString();
		}
		else {
			sSQL = sSQL.orderBy('a.academicStaffID', 'desc').groupBy('a.academicStaffID').toString();

		}

		ContractStaff.query(sSQL, function(err, result) {
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
		ContractStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getRightToRefuse: function(id, where, callback) {
		var sSQL = mysql.select('r.*', 'd.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title')
			.from('ContractStaff AS cs')
			.innerJoin('RightToRefusal AS r', 'cs.contractStaffID', 'r.contractStaffID')
			.innerJoin('Section_Offered AS so', 'r.sectionOfferedID', 'so.sectionOfferedID')
			.innerJoin('Section AS s', 'so.sectionID', 's.sectionID')
			.innerJoin('Course AS c', 'so.courseID', 'c.courseID')
			.innerJoin('Department AS d', 'c.departmentID', 'd.departmentID')
			.where('cs.contractStaffID', id);

		if (where) {
			sSQL = sSQL.where('r.rightToRefusalID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		ContractStaff.query(sSQL, function(err, result) {
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
		ContractStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getRank: function(id, where, callback) {
		var sSQL = mysql.select('rk.*', 'cs.*', 'c.academicStaffID')
			.from('ContractStaff AS c')
			.innerJoin('ContractStaff_Rank AS cs', 'c.contractStaffID', 'cs.contractStaffID')
			.innerJoin('Rank AS rk', 'cs.rankID', 'rk.rankID')
			.where('c.academicStaffID', id);

		if (where) {
			sSQL = sSQL.where('cs.contractStaffRankID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		ContractStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getEmployment: function(id, where, callback) {
		var sSQL = mysql.select('ce.*', 'c.academicStaffID')
			.from('ContractStaff AS c')
			.innerJoin('ContractStaffEmployment AS ce', 'c.contractStaffID', 'ce.contractStaffID')
			.where('c.academicStaffID', id);

		if (where) {
			sSQL = sSQL.where('ce.contractEmploymentID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		ContractStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
};