/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var mysql = require('knex')({
	client: 'mysql'
});

module.exports = {
	getAllCourse: function(req, res) {
		var	courseID = req.param('courseID');
		CourseService.getAllCourse(courseID, function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		});
	},
	
	getInfo: function(req, res) {
		var responseFn = function(err, result) {
			if (err) return res.serverError(err);
			return res.ok(result);
		};
		var data = {
			id: req.param('id'),
			type: req.param('type'),
			where: req.param('where')
		};
		switch (data.type) {
			case 'section':
				CourseService.getSectionOffered(data.id, responseFn)
				break;
			default:
				res.serverError();
				console.log("Incorrect REST url");
		}
	}
	
};

