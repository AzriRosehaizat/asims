/**
* RegularStaff_Research.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		regularStaffResearchID: {
			type: 'integer',
			autoIncrement: true,
			primaryKey: true,
			index: true
		},
		researchID: {
			model: 'Research',
			required: true
		},
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		startDate: {
			type: 'date'
		},
		endDate: {
			type: 'date',
		}
	},
	tableName: 'RegularStaff_Research'
};
