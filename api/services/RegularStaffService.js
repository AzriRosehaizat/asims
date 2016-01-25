var async = require('async');
module.exports = {
    find : function(criteria, select, callback){
        var criteria = criteria || {},
        select = Object.assign(
            { academicStaff : true },
            ( select || {} )
        ),
        joins = [];
        RegularStaff.find( criteria).exec( function (error, regularStaff ){
            async.forEachOf( regularStaff , function( value , key, nextRegularStaff ){    
                /*************************************************************
                                      BEGIN CUSTOM CODE
                *************************************************************/
                if (select.academicStaff) {
                    joins.push( function( nextJoin ){
                        AcademicStaffService.find( 
                            { 
                                academicStaffID: value.academicStaffID 
                            },
                            {
                                //do not also select departments (just an example)
                                // departments: true,
                            },
                            function(error, academicStaff){
                                regularStaff[key] = Object.assign( value, academicStaff[0] );
                                nextJoin(error);
                            }
                        );
                    });
                }
                /*************************************************************
                                         END CUSTOM CODE
                *************************************************************/
                async.waterfall( joins, function(){
                    nextRegularStaff();
                });
            }, 
        function( error ){
                callback( error, regularStaff);
            });
        });
    }
};