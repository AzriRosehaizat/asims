var async = require('async');
module.exports = {
    find : function(criteria, select, callback){
        var criteria = criteria || {},
        select = Object.assign(
            //set default for joins
            { academicStaff: true },
            ( select || {} )
        ),
        joins = [];
        Department.find( criteria).exec( function (error, departments ){
            async.forEachOf( departments , function( value , key, nextDepartment ){    
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                //if the selection criteria is not set to false
                if (select.academicStaff) {
                    //push a function with the sig: function(arg1, ... , argN, callback)
                    joins.push( function( nextJoin ){
                        //perform the join
                        AcademicStaff_DepartmentService.find( 
                            { 
                                departmentID: value.departmentID,
                                select : [ 'academicStaffID', 'startDate', 'endDate']
                            },
                            //specify the callback to trigger once completed
                            function(error, academicStaffDepartments){
                                departments[key].academicStaffDepartments = academicStaffDepartments;
                                nextJoin();
                            }
                        );
                    });
                    joins.push( function( nextJoin ){
                        async.forEachOf(departments[key].academicStaffDepartments, function(v, k, nextAcademicStaffDepartment){
                            AcademicStaffService.find(
                                {
                                    academicStaffID: v.academicStaffID
                                },
                                {
                                    departments: false
                                },
                                function( error, academicStaff){
                                    departments[key].academicStaffDepartments[k].academicStaffID = academicStaff;
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
                    nextDepartment();
                });
            }, 
        function( error ){
                callback( error, departments);
            });
        });
    }
}