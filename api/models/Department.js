/**
* Department.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
  		departmentID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		facultyID: {
			model: 'Faculty',
			required: true
		},
		departmentCode: {
			type: 'string',
			required: true
		},
		title:{
			type: 'string',
			size: 50,
			required: true
		},
		description: {
			type: 'text',
		},
		//Join table AcademicStaff_Department 1:M
		AcademicStaff_Department:{
			collection: 'AcademicStaff_Department',
			via: 'departmentID'
		},
		//Join table 1:M
		Chair: {
			collection: 'Chair',
			via: 'departmentID'
		},
		//has defaultNormal load
		DefaultNormalLoad: {
			collection: 'DefaultNormalLoad',
			via: 'departmentID'
		},
		Course: {
			collection: 'Course',
			via: 'departmentID'
		}

	},
	tableName: 'Department'
};