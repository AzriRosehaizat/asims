var async = require('async');
module.exports = {
    find : function(criteria, select, callback){
        var criteria = criteria || {},
        select = Object.assign(
            { departments : true },
            ( select || {} )
        ),
        joins = [];
        AcademicStaff.find( criteria).exec( function (error, academicStaff ){
            async.forEachOf( academicStaff , function( value , key, nextAcademicStaff ){    
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                if (select.departments) {
                    joins.push( function( nextJoin ){
                        AcademicStaff_DepartmentService.getDepartments( 
                            { 
                                academicStaffID: value.academicStaffID 
                            },
                            function(error, departments){
                                value.departments = departments;
                                academicStaff[key] = value;
                                nextJoin(error);
                            }
                        );
                    });
                }
                /*************************************************************
                                         END CUSTOM CODE
                *************************************************************/
                async.waterfall( joins, function(){
                    nextAcademicStaff();
                });
            }, 
        function( error ){
                callback( error, academicStaff);
            });
        });
    }
};