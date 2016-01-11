/**
* Chair.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		departmentID: {
			model: 'Department',
			required: true 
		},
		startDate:{
			type: 'date',
			primaryKey: 'true',
			index: 'true'
		},
		endDate:{
			type: 'date'
		}
	},

	tableName: 'Chair'
};