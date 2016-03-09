var mysql = require('knex')({
    client: 'mysql'
});
module.exports = {
    //Page Regular Staff
    getTeachingActivity: function(teachingActivitiesID, callback) {
        var sSQL = mysql.select('d.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title', 'so.*')
            .from('teachingActivities AS so')
            .innerJoin('Section AS s', 'so.sectionID', 's.sectionID')
            .innerJoin('Course As c', 'so.courseID', 'c.courseID')
            .innerJoin('Department AS d', 'c.departmentID', 'd.departmentID');
        //check if criteria needed
        if (teachingActivitiesID) {
            sSQL = sSQL.where('so.teachingActivitiesID', teachingActivitiesID);
        }
        
        // Stringify
        sSQL = sSQL.toString();

        // console.log(sSQL);
        TeachingActivities.query(sSQL, function(err, result) {
            callback(err, result);
        });
    }
}