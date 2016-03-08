var mysql = require('knex')({
    client: 'mysql'
});

module.exports = {

    getAllCourse: function(id, callback) {

        var sSQL = mysql.select('c.*', 'd.departmentCode')
            .from('Course AS c')
            .innerJoin('AcademicStaff_Department AS ad', 'c.departmentID', 'ad.departmentID')
            .innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID');
        //check if criteriea needed
        if (id) {
            sSQL = sSQL.where('courseID', id).groupBy('c.courseID').toString();
        }
        else {
            sSQL = sSQL.groupBy('c.courseID').toString();

        }

        Course.query(sSQL, callback);
    },

    getTeachingActivity: function(id, where, callback) {
        var sSQL = mysql.select('so.*', 's.*')
            .from('TeachingActivities AS so')
            .innerJoin('Section AS s', 'so.sectionID', 's.sectionID')
            .innerJoin('Course AS c', 'so.courseID', 'c.courseID')
            .where('so.courseID', id);

        if (where) {
            sSQL = sSQL.where('so.teachingActivitiesID', where).toString();
        }
        else {
            sSQL = sSQL.toString();
        }

        Course.query(sSQL, callback);
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