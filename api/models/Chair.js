/**
* Chair.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		chairID: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			index: true
		},
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
			required: true 
		},
		endDate:{
			type: 'date'
		}
	},

	tableName: 'Chair'
};