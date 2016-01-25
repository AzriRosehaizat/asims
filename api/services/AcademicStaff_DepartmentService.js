var async = require('async');
module.exports = {
    getDepartments : function( criteria, callback ){
        AcademicStaff_Department.find( 
            criteria
        ).populate(
            'departmentID'
        ).exec( 
            function(error, departments){
                for (var x in departments){
                    delete departments[x]['academicStaffID'];
                }
                callback(null, departments);
            }
        );
    },
    getAcademicStaff : function( criteria, callback ){
        AcademicStaff_Department.find( 
            criteria
        ).populate(
            'academicStaffID'
        ).exec( 
            function(error, academicStaff){
                for (var x in academicStaff){
                    delete academicStaff[x]['departmentID'];
                }
                callback(null, academicStaff);
            }
        );
    },
};