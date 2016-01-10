/**
* RegularStaff_Research.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		researchID: {
			model: 'Research',
			required: true
		},
		regularStaffID: {
			model: 'RegularStaff',
			required: true
		},
		loadReductionID: {
			model: 'LoadReduction'
		},
		startDate: {
			type: 'date'
			required: true
		},
		endDate: {
			type: 'date',
		}
	},
	tableName: 'RegularStaff_Research'
};
