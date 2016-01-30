var async = require('async');

module.exports = {
    find : function( data, callback ){
        var startID = data.startID  || 0,
            limit   = data.limit    || 1000000,
            criteria= Object.assign( { academicStaffID: { '>': startID } }, data.criteria || {} ),
            joins   = Object.assign( { department : true } , data.joins || {} );
        
        AcademicStaff
        .find()
        .where( criteria )
        .sort( { academicStaffID : 'asc' } )
        .limit( limit )
        .exec( function( error, academicStaff ){
            async.forEachOf( academicStaff , function( value , key, nextAcademicStaff ){
                var joinArray = [];
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                if( joins.department ){
                    joinArray.push( function( nextJoin ){
                        academicStaff[key].departments = [];
                        AcademicStaff_Department
                        .find( { academicStaffID : value.academicStaffID } )
                        .exec( function( error, academicStaff_Department ){
                            async.forEachOf( academicStaff_Department, function( v, k, nextAcademicStaff_Department){
                                Department
                                .findOne( { departmentID : academicStaff_Department[k].departmentID } )
                                .exec( function( error, department ){
                                    academicStaff_Department[k].departmentID = department;
                                    academicStaff[key].departments.push( academicStaff_Department[k] );
                                    nextAcademicStaff_Department();
                                }); 
                            },
                            function( error ){
                                nextJoin();
                            });
                        });
                    });   
                }
                /*************************************************************
                                         END CUSTOM CODE
                *************************************************************/
                async.waterfall( joinArray, function(){
                    nextAcademicStaff();
                });
            }, 
            function( error ){
                    callback( error, academicStaff );
                });
            }
        );
    }
};