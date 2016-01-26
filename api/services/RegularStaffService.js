var async = require('async');

module.exports = {
    find : function( data, callback ){
        var startID = data.startID  || 0,
            limit   = data.limit    || 25,
            criteria= Object.assign( { regularStaffID: { '>': startID } }, data.criteria || {} ),
            joins   = Object.assign( { academicStaff : true } ,data.joins || {} );
        
        RegularStaff
        .find()
        .where( criteria )
        .sort( { regularStaffID: 'asc' } )
        .limit( limit )
        .exec( function( error, regularStaff ){
            async.forEachOf( regularStaff , function( value , key, nextRegularStaff ){
                var joinArray = [];
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                if( joins.academicStaff ){
                    joinArray.push( function( nextJoin ){
                        AcademicStaffService
                        .find( { criteria: { academicStaffID : value.academicStaffID } }, 
                        function( error, academicStaff ){
                            regularStaff[key].academicStaffID = academicStaff ; 
                            nextJoin();
                        });
                    });   
                }
                /*************************************************************
                                         END CUSTOM CODE
                *************************************************************/
                async.waterfall( joinArray, function(){
                    nextRegularStaff();
                });
            }, 
            function( error ){
                    callback( error, regularStaff );
                });
            }
        );
    }
};