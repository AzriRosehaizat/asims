
var mysql = require('knex')({client: 'mysql'});

module.exports = {
    
    getRAS: function(data, cb){
        data = mysql.select('*').from('RegularStaff').innerJoin('AcademicStaff', 'RegularStaff.regularStaffID', 'AcademicStaff.academicStaffID').toString();
        RegularStaff.query(data, function(error, result){
            cb(error,result)
        })
        
    }

};