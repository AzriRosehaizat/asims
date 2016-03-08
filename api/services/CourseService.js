var mysql = require('knex')({
    client: 'mysql'
});

module.exports = {

    getAllCourse: function(id, callback) {

        var sSQL = mysql.select('c.*', 'd.departmentCode')
            .from('Course AS c')
            .innerJoin('AcademicStaff_Department AS ad', 'c.departmentID', 'ad.departmentID')
            .innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID');
            
        sSQL = (id) ? sSQL.where('courseID', id).groupBy('c.courseID').toString() : sSQL.groupBy('c.courseID').toString();
        Course.query(sSQL, callback);
    },

    getTeachingActivity: function(id, where, callback) {
        var sSQL = mysql.select('t.*', 's.*')
            .from('TeachingActivities AS t')
            .innerJoin('Section AS s', 't.sectionID', 's.sectionID')
            .where('t.courseID', id);

        sSQL = (id) ? sSQL.where('t.teachingActivitiesID', where).toString() : sSQL.toString();
        Course.query(sSQL, callback);
    }
};