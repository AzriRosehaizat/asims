var async = require('async');
module.exports = {
    find : function( criteria, callback ){
        AcademicStaff_Department.find( 
            Object.assign( criteria )
        ).exec( 
            callback
        );
    }
};