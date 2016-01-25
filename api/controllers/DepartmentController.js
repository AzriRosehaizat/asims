/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing Departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find : function( req, res ){
	    DepartmentService.find( {}, {},  
	        function( error, departments){
	            res.json(departments);
	        }
	    );
	}
};

