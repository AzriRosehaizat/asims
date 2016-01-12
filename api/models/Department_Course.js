/**
* Department_Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		departmentCourseID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		courseID: {
			model: 'Course',
			required: true
		},
		departmentID: {
			model: 'Department',
			required: true
		},
		title: {
			type: 'string',
			size: 50		
		},
		description: {
			type: 'text'
		},
		//Offers Course_Section 1:M
		Course_Section: {
			collection: 'Course_Section',
			via: 'departmentCourseID'
		}
	},
	tableName: 'Department_Course'
};
