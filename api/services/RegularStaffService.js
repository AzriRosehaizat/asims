var mysql = require('knex')({
	client: 'mysql'
});
var sSQL;
module.exports = {
	//Page Regular Staff
	getAllRegularStaff: function(callback) {
		sSQL = mysql.select('a.*', 'r.contApptDate', 'r.tenureDate', 'd.departmentCode', 'rk.title AS Rank')
			.from('RegularStaff AS r')
			.leftJoin('RegularStaff_Rank AS rs', 'r.regularStaffID', 'rs.regularStaffID')
			.leftJoin('Rank AS rk', 'rs.rankID', 'rk.rankID')
			.leftJoin('AcademicStaff AS a', 'r.regularStaffID', 'a.academicStaffID')
			.leftJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.leftJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
			.where('ad.isPrimaryDepartment', 1)
			.orderBy('a.academicStaffID', 'desc')
			.toString();
		console.log(sSQL);
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	getDepartment: function(id, callback) {
		sSQL = mysql.select('d.*', 'ad.*', 'ad.academicStaffID')
			.from('AcademicStaff AS a')
			.innerJoin('AcademicStaff_Department AS ad', 'a.academicStaffID', 'ad.academicStaffID')
			.innerJoin('Department AS d', 'ad.departmentID', 'd.departmentID')
			.where('a.academicStaffID', id)
			.toString();
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	// get rank by id
	getRank: function(id, callback) {
		sSQL = mysql.select('rk.*', 'rs.*', 'r.academicStaffID')
			.from('RegularStaff AS r')
			.innerJoin('RegularStaff_Rank AS rs', 'r.regularStaffID', 'rs.regularStaffID')
			.innerJoin('Rank AS rk', 'rs.rankID', 'rk.rankID')
			.where('r.academicStaffID', id)
			.toString();
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	},
	// get rank by id
	getEmployment: function(id, callback) {
		sSQL = mysql.select('re.*', 'r.academicStaffID')
			.from('RegularStaff AS r')
			.innerJoin('RegularStaffEmployment AS re', 'r.regularStaffID', 're.regularStaffID')
			.where('r.academicStaffID', id)
			.toString();
		RegularStaff.query(sSQL, function(err, result) {
			callback(err, result);
		});
	}


};


// var async = require('async');

// module.exports = {
//     find : function( data, callback ){
//         var startID = data.startID  || 0,
//             limit   = data.limit    || 25,
//             criteria= Object.assign( { regularStaffID: { '>': startID } }, data.criteria || {} ),
//             joins   = Object.assign( { academicStaff : true, research: true, ranks: true }, data.joins || {} );

//         RegularStaff
//         .find()
//         .where( criteria )
//         .sort( { regularStaffID: 'asc' } )
//         .limit( limit )
//         .exec( function( error, regularStaff ){
//             async.forEachOf( regularStaff , function( value , key, nextRegularStaff ){
//                 var joinArray = [];
//                 /*************************************************************
//                                       BEGIN CUSTOM CODE
//                 *************************************************************/
//                 if( joins.academicStaff ){
//                     joinArray.push( function( nextJoin ){
//                         AcademicStaffService
//                         .find( { criteria: { academicStaffID : value.academicStaffID } }, 
//                         function( error, academicStaff ){
//                             regularStaff[key].academicStaffID = academicStaff ; 
//                             nextJoin();
//                         });
//                     });   
//                 }

//                 if( joins.research ){
//                     joinArray.push( function( nextJoin ){
//                         regularStaff[key].research = [];
//                         RegularStaff_Research
//                         .find( { regularStaffID : value.regularStaffID } )
//                         .exec( function( error, regularStaff_Research ){
//                             async.forEachOf( regularStaff_Research, function( v, k, nextRegularStaff_Research){
//                                 Research
//                                 .findOne( { researchID : regularStaff_Research[k].researchID } )
//                                 .exec( function( error, research ){
//                                     regularStaff_Research[k].researchID = research;
//                                     regularStaff[key].research.push( regularStaff_Research[k] );
//                                     nextRegularStaff_Research();
//                                 }); 
//                             },
//                             function( error ){
//                                 nextJoin();
//                             });
//                         });
//                     });   
//                 }

//                 if( joins.ranks ){
//                     joinArray.push( function( nextJoin ){
//                         regularStaff[key].ranks = [];
//                         RegularStaff_Rank
//                         .find( { regularStaffID : value.regularStaffID } )
//                         .exec( function( error, regularStaff_Rank ){
//                             async.forEachOf( regularStaff_Rank, function( v, k, nextRegularStaff_Rank){
//                                 Rank
//                                 .findOne( { rankID : regularStaff_Rank[k].rankID } )
//                                 .exec( function( error, rank ){
//                                     regularStaff_Rank[k].rankID = rank;
//                                     regularStaff[key].ranks.push( regularStaff_Rank[k] );
//                                     nextRegularStaff_Rank();
//                                 }); 
//                             },
//                             function( error ){
//                                 nextJoin();
//                             });
//                         });
//                     });   
//                 }
//                 /*************************************************************
//                                          END CUSTOM CODE
//                 *************************************************************/
//                 async.waterfall( joinArray, function(){
//                     nextRegularStaff();
//                 });
//             }, 
//             function( error ){
//                     callback( error, regularStaff );
//                 });
//             }
//         );
//     }
// };
