/**
* RegularStaff.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {


	attributes: {
		regularEmploymentID: {
			type: 'integer',
			index: true,
			autoIncrement: true,
			primaryKey: true
		},

		startDate: {
			type: 'date',
			required: true
		},

		endDate: {
			type: 'date'
		},

		regularStaffID: {
			model: 'RegularStaff',
			required: true
		}

	},

	tableName: 'RegularStaffEmployment'
};
