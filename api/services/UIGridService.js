
var mysql = require('knex')({client: 'mysql'});
var sSQL;
module.exports = {
	//Page Regular Staff
    populateRegularStaff: function(sSQL, callback){
        sSQL = mysql.select('a.*', 'r.contApptDate', 'r.tenureDate', 'd.departmentCode', 'rk.title AS Rank')
		        			.from('RegularStaff AS r')
		        				.innerJoin('RegularStaff_Rank AS rs', 'r.regularStaffID', 'rs.regularStaffID')
		        				.innerJoin('Rank AS rk', 'rs.rankID', 'rk.rankID')
		        				.innerJoin('AcademicStaff AS a', 'r.regularStaffID', 'a.academicStaffID')
		        				.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
		        				.innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
		        				.toString();	

		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});    	
    }

};