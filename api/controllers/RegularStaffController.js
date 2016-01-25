/**
 * RegularStaffController
 *
 * @description :: Server-side logic for managing Regularstaffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mysql = require('knex')({client: 'mysql'});


module.exports = {
	//based on james code
	find : function( req, res ){
	    RegularStaffService.find( {}, {}, 
	        function( error, regularStaff){
	            res.json(regularStaff);
	        }
	    );
	},
	
	//test knex builder and .query method
	//more maintaninable than raw sql
	//x12 ?
	test: function( req, res){
        var sSQL = mysql.select('a.*', 'r.contApptDate', 'r.tenureDate', 'd.departmentCode', 'rk.title AS Rank')
		        			.from('RegularStaff AS r')
		        				.innerJoin('RegularStaff_Rank AS rs', 'r.regularStaffID', 'rs.regularStaffID')
		        				.innerJoin('Rank AS rk', 'rs.rankID', 'rk.rankID')
		        				.innerJoin('AcademicStaff AS a', 'r.regularStaffID', 'a.academicStaffID')
		        				.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
		        				.innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
		        				.toString();
                console.log(sSQL);			
				
		RegularStaff.query(sSQL, function(err, results) {
  			if (err) return res.serverError(err);
			return res.ok(results);
});
	}
};

