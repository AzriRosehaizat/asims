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

		//check if criteriea needed
		if (departmentID) {
			sSQL = sSQL.where('d.departmentID', departmentID).groupBy('d.departmentID').toString();
		}
		else {
			sSQL = sSQL.orderBy('d.departmentID', 'desc').groupBy('d.departmentID').toString();

		}
		// console.log(sSQL);
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getCourse: function(id, where, callback) {
		var sSQL = mysql.select('c.*', 'd.departmentCode')
			.from('Course AS c')
			.innerJoin('Department as d', 'c.departmentID', 'd.departmentID')
			.where('c.departmentID', id);

		if (where) {
			sSQL = sSQL.where('c.courseID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		// console.log(sSQL)
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
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

		if (where) {
			sSQL = sSQL.where('ad.academicStaffDepartmentID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
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

		if (where) {
			sSQL = sSQL.where('ad.academicStaffDepartmentID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
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
			
		if (where) {
			sSQL = sSQL.where('ch.chairID', where).toString();
		}
		else {
			sSQL = sSQL.toString();
		}
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
};
