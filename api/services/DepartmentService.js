var mysql = require('knex')({
	client: 'mysql'
});
module.exports = {
	//Page Department
	getAllDepartment: function(departmentID, callback) {
		// console.log(regularStaffID);
		var sSQL = mysql.select('d.*', 'f.title as facultyTitle', 'f.facultyID', 'cv.Chair')
			.from('Department AS d')
			.innerJoin('Faculty AS f', 'd.facultyID', 'f.facultyID')
			.leftJoin('MostRecentChair AS cv', 'd.departmentID', 'cv.departmentID');
			
		sSQL = (departmentID) ? sSQL.where('d.departmentID', departmentID).groupBy('d.departmentID').toString()
							  : sSQL.orderBy('d.departmentID', 'desc').groupBy('d.departmentID').toString();
		Department.query(sSQL, callback);
	},
	getCourse: function(id, where, callback) {
		var sSQL = mysql.select('c.*', 'd.departmentCode')
			.from('Course AS c')
			.innerJoin('Department as d', 'c.departmentID', 'd.departmentID')
			.where('c.departmentID', id);
			
		sSQL = (where) ? sSQL.where('c.courseID', where).toString() : sSQL.toString();
		Department.query(sSQL, callback);
	},
	getRegularStaff: function(id, where, callback) {
		var sSQL = mysql.select('a.*', 'rv.*', 'ad.academicStaffDepartmentID', 'ad.startDate', 'ad.endDate', 'rk.title as Rank')
			.from('AcademicStaff AS a')
			.innerJoin('MostRecentRank_Regular as rv', 'a.academicStaffID', 'rv.academicStaffID')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department as d', 'ad.departmentID', 'd.departmentID')
			.leftJoin('Rank as rk', 'rv.rankID', 'rk.rankID')
			.groupBy('a.academicStaffID')
			.where('ad.departmentID', id);
			
		sSQL = (where) ? sSQL.where('ad.academicStaffDepartmentID', where).toString() : sSQL.toString();
		Department.query(sSQL, callback);
	},
	getContractStaff: function(id, where, callback) {
		var sSQL = mysql.select('a.*', 'cv.*', 'ad.academicStaffDepartmentID', 'ad.startDate', 'ad.endDate', 'rk.title as Rank')
			.from('AcademicStaff AS a')
			.innerJoin('MostRecentRank_Contract as cv', 'a.academicStaffID', 'cv.academicStaffID')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department as d', 'ad.departmentID', 'd.departmentID')
			.leftJoin('Rank as rk', 'cv.rankID', 'rk.rankID')
			.groupBy('a.academicStaffID')
			.where('ad.departmentID', id);
			
		sSQL = (where) ? sSQL.where('ad.academicStaffDepartmentID', where).toString() : sSQL.toString();
		Department.query(sSQL, callback);
	},
	getChair: function(id, where, callback) {
		var sSQL = mysql.select('a.*', 'ch.*')
			.from('Chair AS ch')
			.innerJoin('RegularStaff AS r', 'ch.RegularStaffID', 'r.regularStaffID')
			.innerJoin('AcademicStaff AS a', 'r.academicStaffID', 'a.academicStaffID')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department as d', 'ad.departmentID', 'd.departmentID')
			.where('ch.departmentID', id)
			.groupBy('a.academicStaffID');
			
		sSQL = (where) ? sSQL.where('ch.chairID', where).toString() : sSQL.toString();
		Department.query(sSQL, callback);
	},
};
