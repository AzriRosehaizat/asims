var async = require('async');

module.exports = {
    find : function( data, callback ){
        var startID = data.startID  || 0,
            limit   = data.limit    || 1000000,
            criteria= Object.assign( { academicStaffID: { '>': startID } }, data.criteria || {} ),
            joins   = Object.assign( { department : true } , data.joins || {} ),
            joinArray  = [];
        
        AcademicStaff
        .find()
        .where( criteria )
        .sort( { academicStaffID : 'asc' } )
        .limit( limit )
        .exec( function( error, academicStaff ){
            async.forEachOf( academicStaff , function( value , key, nextAcademicStaff ){
                joinArray = [];
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                if( joins.department ){
                    joinArray.push( function( nextJoin ){
                        academicStaff[key].departments = [];
                        AcademicStaff_Department
                        .find( { academicStaffID : value.academicStaffID } )
                        .exec( function( error, academicStaff_Department ){
                            Department
                            .findOne( { departmentID : academicStaff_Department[0].departmentID } )
                            .exec( function( error, department ){
                                academicStaff_Department[0].departmentID = department;
                                academicStaff[key].departments.push( academicStaff_Department[0] );
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