var mysql = require('knex')({
    client: 'mysql'
});
module.exports = {
    //Page Regular Staff
    getSectionOffered: function(sectionOfferedID, callback) {
        var sSQL = mysql.select('d.departmentCode', 'c.courseNo', 's.sectionNo', 'c.title', 'so.*')
            .from('Section_Offered AS so')
            .innerJoin('Section AS s', 'so.sectionID', 's.sectionID')
            .innerJoin('Course As c', 'so.courseID', 'c.courseID')
            .innerJoin('Department AS d', 'c.departmentID', 'd.departmentID');
        //check if criteria needed
        if (sectionOfferedID) {
            sSQL = sSQL.where('so.sectionOfferedID', sectionOfferedID);
        }
        
        // Stringify
        sSQL = sSQL.toString();

        console.log(sSQL);
        Section_Offered.query(sSQL, function(err, result) {
            callback(err, result);
        });
    }
}