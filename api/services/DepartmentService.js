var mysql = require('knex')({
	client: 'mysql'
});
module.exports = {
    //Page Department
	getAllDepartment: function(departmentID, callback) {
		// console.log(regularStaffID);
		var sSQL = mysql.select('d.*', 'f.*', 'cv.Chair')
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
	getCourse: function(id, callback) {
		var sSQL = mysql.select('c.*', 'd.departmentCode')
			.from('Course AS c')
			.innerJoin('Department as d', 'c.departmentID', 'd.departmentID')
			.where('c.departmentID', id)
			.toString();
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getRegularStaff: function(id, callback) {
		var sSQL = mysql.select('a.*', 'r.*', 'ad.startDate', 'ad.endDate', 'rk.title as Rank')
			.from('RegularStaff AS r')
			.innerJoin('AcademicStaff AS a', 'r.academicStaffID', 'a.academicStaffID')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department as d', 'ad.departmentID', 'd.departmentID')
			.innerJoin('MostRecentRank as rv', 'r.regularStaffID', 'rv.regularStaffID')
			.innerJoin('Rank as rk', 'rv.rankID', 'rk.rankID')
			.groupBy('a.academicStaffID')
			.where('d.departmentID', id)
			.toString();
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getContractStaff: function(id, callback) {
		var sSQL = mysql.select('a.*', 'ad.startDate', 'ad.endDate')
			.from('ContractStaff AS cs')
			.innerJoin('AcademicStaff AS a', 'cs.academicStaffID', 'a.academicStaffID')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department as d', 'ad.departmentID', 'd.departmentID')
			.groupBy('a.academicStaffID')
			.where('d.departmentID', id)
			.toString();
		Department.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
};