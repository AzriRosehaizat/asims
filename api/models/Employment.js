/**
* Employment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		employmentID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
		staffID: {
			model: 'AcademicStaff',
			required: true
		},
		hireDate: {
			type: 'date',
			required: true
		},
		terminationDate: {
			type: 'date'
		}
	},
	tableName: 'Employment'
};
