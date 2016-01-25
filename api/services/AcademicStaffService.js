var async = require('async');
module.exports = {
    find : function(criteria, select, callback){
        var criteria = criteria || {},
        select = Object.assign(
            { departments : true },
            ( select || {} )
        ),
        joins = [];
        AcademicStaff.find( criteria ).exec( function (error, academicStaff ){
            async.forEachOf( academicStaff , function( value , key, nextAcademicStaff ){    
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                if (select.departments) {
                    joins.push( function( nextJoin ){
                        AcademicStaff_DepartmentService.find( 
                            { 
                                academicStaffID: value.academicStaffID,
                                select : [ 'departmentID', 'startDate', 'endDate']
                            },
                            function(error, academicStaffDepartments){
                                academicStaff[key].academicStaffDepartments = academicStaffDepartments;
                                nextJoin(error);
                            }
                        );
                    });
                    joins.push( function( nextJoin ){
                        async.forEachOf(academicStaff[key].academicStaffDepartments, function(v, k, nextAcademicStaffDepartment){
                            DepartmentService.find(
                                {
                                    departmentID: v.departmentID
                                },
                                {
                                    academicStaff: false
                                },
                                function( error, department){
                                    academicStaff[key].academicStaffDepartments[k].departmentID = department;
                                    nextAcademicStaffDepartment();
                                });
                    },
                        function( error ){
                            nextJoin( error );
                        });
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