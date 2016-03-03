var mysql = require('knex')({
	client: 'mysql'
});
module.exports = {
	    
    getAllCourse: function(id, callback) {
        
        var sSQL = mysql.select('c.*', 'd.departmentCode')
            .from('Course AS c')
            .innerJoin('AcademicStaff_Department AS ad', 'c.departmentID', 'ad.departmentID')
                .innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID');
            // .where('c.courseID', id)
            		//check if criteriea needed
		if (id) {
			sSQL = sSQL.where('courseID', id).groupBy('c.courseID').toString();
		}
		else {
			sSQL = sSQL.groupBy('c.courseID').toString();
			
		}
            console.log(sSQL);
    
        Course.query(sSQL, function(err,result) {
          callback(err,result);
        });
    },
    
    getSectionOffered: function(id, callback)
    {
        var sSQL = mysql.select('s.*', 'c.*')
            .from('Section_Offered AS s')
            .innerJoin('Course AS c', 's.courseID', 'c.courseID')
            .where('s.courseID', id)
            .toString();
            
                        console.log(sSQL);

            
        Course.query(sSQL, function(err,result) {
          callback(err,result);
        });
    },
    
// 	getInstructor: function(id, callback) {
// 		var sSQL = mysql.select('a.*', 's.*')
// 			.from('AcademicStaff AS a')
// 			.innerJoin('TeachingActivities AS ta', 'a.academicStaffID', 'ta.academicStaffID')
// 			.innerJoin('Section_Offered AS s', 'ta.sectionOfferedID', 's.sectionOfferedID')
// 			.where('s.courseID', id)
// 			.toString();
			
// 			console.log(sSQL);
			
			
// 		Course.query(sSQL, function(err, result) {
// 			callback(err, result);
// 		});
// 	}
    	
};