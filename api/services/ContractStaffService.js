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
		sSQL = (contractStaffID) ? sSQL.where('c.contractStaffID', contractStaffID).groupBy('a.academicStaffID').toString()
								 : sSQL.orderBy('a.academicStaffID', 'desc').groupBy('a.academicStaffID').toString();
		ContractStaff.query(sSQL, callback);
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
		ContractStaff.query(sSQL, callback);
	},
	getRightToRefusal: function(id, where, callback) {
		var sSQL = mysql.select('r.*', 'd.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title')
			.from('ContractStaff AS cs')
			.innerJoin('RightToRefusal AS r', 'cs.contractStaffID', 'r.contractStaffID')
			.innerJoin('TeachingActivities AS t', 'r.teachingActivitiesID', 't.teachingActivitiesID')
			.innerJoin('Section AS s', 't.sectionID', 's.sectionID')
			.innerJoin('Course AS c', 't.courseID', 'c.courseID')
			.innerJoin('Department AS d', 'c.departmentID', 'd.departmentID')
			.where('cs.contractStaffID', id);

		sSQL = (where) ? sSQL.where('r.rightToRefusalID', where).toString() : sSQL.toString();
		ContractStaff.query(sSQL, callback);
	},
	getDepartment: function(id, where, callback) {
		var sSQL = mysql.select('d.*', 'ad.*', 'ad.academicStaffID')
			.from('AcademicStaff AS a')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('ad.academicStaffDepartmentID', where).toString() : sSQL.toString();
		ContractStaff.query(sSQL, callback);
	},
	getRank: function(id, where, callback) {
		var sSQL = mysql.select('rk.*', 'cs.*', 'c.academicStaffID')
			.from('ContractStaff AS c')
			.innerJoin('ContractStaff_Rank AS cs', 'c.contractStaffID', 'cs.contractStaffID')
			.innerJoin('Rank AS rk', 'cs.rankID', 'rk.rankID')
			.where('c.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('cs.contractStaffRankID', where).toString() : sSQL.toString();
		ContractStaff.query(sSQL, callback);
	},
	getEmployment: function(id, where, callback) {
		var sSQL = mysql.select('ce.*', 'c.academicStaffID')
			.from('ContractStaff AS c')
			.innerJoin('ContractStaffEmployment AS ce', 'c.contractStaffID', 'ce.contractStaffID')
			.where('c.academicStaffID', id);
			
		sSQL = (where) ? sSQL.where('ce.contractEmploymentID', where).toString() : sSQL.toString();
		ContractStaff.query(sSQL, callback);
	},
};