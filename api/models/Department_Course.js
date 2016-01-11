/**
* Department_Course.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		courseID: {
			model: 'Course',
			required: true
		},
		departmentID: {
			model: 'Department',
			required: true
		},
		identifier: {
			type: 'string',
			size: 20,
			required: true
		}
	},
	tableName: 'Department_Course'
};
